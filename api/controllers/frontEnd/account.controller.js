const httpStatus = require("http-status");
const mongoose = require("mongoose");

const token = require("../../utils/token");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");

const { UserModel, UserServicesStatus } = require("../../models/feUser.model");
const { PaymentModel, PaymentStatus } = require("../../models/fePayment.model");
const { CountryModel } = require("../../models/feCountry.model");
const sms = require("../../utils/sms");
const { sendEmail } = require("../../utils/email");

const getUser = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const userinfo = await UserModel.findOne({ _id: userId }, { otp: false, verification: false, gender: false })
    return apiResponse(res, httpStatus.OK, { data: userinfo })
})

const updateUser = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const { firstName, lastName, email, overview, social } = req.body;

    await UserModel.updateOne({ _id: userId }, { $set: { firstName, lastName, email, social, overview } })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" })
})

const updateProfilePicture = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." });

    const { photo } = req.body;
    await UserModel.updateOne({ _id: user._id }, { photo });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Picture Updated" })
})

const updatePhoneOrEmail = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const { phone, countryId, email } = req.body
    const condition = {};
    if (phone && countryId) Object.assign(condition, { "phone.phone": phone, "phone.country._id": countryId });
    else if (email) Object.assign(condition, { email });
    else return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid request." })

    if (email) {
        const user = await UserModel.findOne(condition);
        if (user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Email already exists." })
    }
    else if (phone) {
        const phoneNumber = await UserModel.findOne({ "phone.phone": phone })
        if (phoneNumber) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Phone number already exists." })
    }


    const randomOtp = Math.floor(Math.random() * (999999 - 100000) + 100000)
    // const randomOtp = 123456
    const otpMessage = `আপনার ভেরিফিকেশন কোডটি হলো - ${randomOtp}`
    // const otpMessage = `Your OTP is - ${randomOtp}`
    console.log(otpMessage)

    if (phone) {
        const otpRes = await sms.sendSms(`+880${req.body.phone}`, otpMessage)
        if (otpRes) {
            const update = await UserModel.updateOne({ _id: user._id }, { "otp.otp": randomOtp, "otp.verified": false })
            return apiResponse(res, httpStatus.CREATED, { data: user, message: 'OTP send to your phone number. Please verify.' })
        }
    } else if (email) {
        await sendEmail({
            to: user.email,
            subject: "Unishopr Login OTP",
            text: otpMessage
            // templateId: "d-96960805a9c14b43825c9981392e25e4",
            // dynamicData: {
            //     customerFirstName: user.firstName,
            //     customerLastName: user.lastName,
            // }
        })
    }

    const update = await UserModel.updateOne({ _id: user._id }, { "otp.otp": randomOtp, "otp.verified": false })
    return apiResponse(res, httpStatus.CREATED, { data: user, message: `OTP send to your ${email ? "email" : "phone number"}. Please verify.` })

})

const otpVerify = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    const { otp, phone, countryId, email } = req.body;

    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const user = await UserModel.findOne({ $and: [{ _id: userId }, { "otp.otp": otp }] }, {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        "verification.verified": true,
        services: true
    });
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Incorrect OTP. Try again!" })

    if (phone && countryId) {
        const country = await CountryModel.findOne({ _id: countryId })
        const updatePhone = await UserModel.updateOne({ _id: user._id }, { "phone.phone": phone, "phone.country": country, "otp.verified": true });

        if (updatePhone) return apiResponse(res, httpStatus.ACCEPTED, {
            data: {
                user: user,
            },
            message: "Your phone number has been updated successfully."
        });
    }
    else if (email) {
        const updateEmail = await UserModel.updateOne({ _id: user._id }, { email, "otp.verified": true });
        if (updateEmail) return apiResponse(res, httpStatus.ACCEPTED, {
            data: {
                user: user,
            },
            message: "Your email has been updated successfully."
        });
    }

    return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Something went wrong. Try again!" })
});


const getPayments = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const payments = await PaymentModel.find({ "user._id": userId }).sort({ createdAt: -1 }).exec();
    return apiResponse(res, httpStatus.OK, { data: payments });
})

const partnerRequest = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    const { overview } = req.body;

    await UserModel.updateOne({ _id: userId }, {
        "services.partner.isPartner": true,
        "services.partner.overview": overview,
        "services.partner.status": UserServicesStatus.requested
    })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Partner Request Accepted" });
})

module.exports = {
    getUser,
    updateUser,
    updateProfilePicture,
    getPayments,
    updatePhoneOrEmail,
    otpVerify,
    partnerRequest
}
