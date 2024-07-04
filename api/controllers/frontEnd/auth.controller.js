const jsonwebtoken = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");
const sms = require("../../utils/sms");
const { sendEmail } = require("../../utils/email");

const { UserModel } = require("../../models/feUser.model");
const { OAuthAccessTokenModel } = require("../../models/feOAuthAccessToken.model");
const { OAuthRefreshTokenModel } = require("../../models/feOAuthRefreshToken.model");
const { CountryModel } = require("../../models/feCountry.model");

const generateToken = (user, exp, secret) => {
    return jsonwebtoken.sign(
        {
            sub: user,
            platform: "frontEnd",
            iat: moment().unix(),
            exp: moment(exp).unix(),
        },
        secret
    );
};

const OAuthAccessTokenDetail = async (accessToken, user, exp) => {
    const data = new OAuthAccessTokenModel({
        _id: accessToken,
        user: user._id,
        revoked: false,
        expires: exp,
    });
    return await data.save();
};

const OAuthRefreshTokenDetail = async (refreshToken, accessTokenDetail, clientId, exp) => {
    const data = new OAuthRefreshTokenModel({
        _id: refreshToken,
        accessToken: accessTokenDetail._id,
        client: clientId,
        revoked: false,
        expires: exp,
    });
    return await data.save();
};

const accessTokenDetailAndRefreshTokenDetail = async (user, clientId) => {
    const exp = moment().add(parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES), "minutes");
    const accessToken = await generateToken(user, exp, process.env.JWT_ACCESS_SECRET);
    const exp2 = moment().add(parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS), "days");
    const refreshToken = await generateToken(user, exp2, process.env.JWT_REFRESH_SECRET);

    const accessTokenDetail = await OAuthAccessTokenDetail(accessToken, user, exp);
    const refreshTokenDetail = await OAuthRefreshTokenDetail(refreshToken, accessTokenDetail, clientId, exp2);

    return { accessTokenDetail, refreshTokenDetail };
};

const register = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, gender, accountType } = req.body;
    const emailLower = email.toLowerCase();
    // const regex = new RegExp(["^", email, "$"].join(""), "i");
    const uniqueValidation = await validationError.uniqueCheck(await UserModel.isUnique(emailLower, phone));
    if (Object.keys(uniqueValidation).length) {
        if (uniqueValidation.phone) {
            return apiResponse(
                res,
                httpStatus.UNPROCESSABLE_ENTITY,
                { message: "This phone already taken by another user." },
                uniqueValidation
            );
        } else if (uniqueValidation.email)
            return apiResponse(
                res,
                httpStatus.UNPROCESSABLE_ENTITY,
                { message: "This email already taken by another user." },
                uniqueValidation
            );
    }

    const country = await CountryModel.findOne({ _id: phone.countryId });
    if (!country) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid Country" });

    const newUser = new UserModel({
        firstName,
        lastName,
        email: emailLower,
        phone: {
            country,
            phone: phone.phone,
        },
        gender,
        accountType,
    });

    const err = newUser.validateSync();
    if (err instanceof mongoose.Error) {
        const valid = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Validation Required" }, valid);
    }

    const randomOtp = Math.floor(Math.random() * (999999 - 100000) + 100000);
    // const randomOtp = 123456
    const otpMessage = `আপনার ভেরিফিকেশন কোডটি হলো - ${randomOtp}`;
    // const otpMessage = `Your OTP is - ${randomOtp}`;
    console.log(otpMessage);

    const otpRes = await sms.sendSms(`+880${phone.phone}`, otpMessage);
    if (otpRes) {
        newUser.otp = { otp: randomOtp, verified: true };
    }
    newUser.otp = { otp: randomOtp, verified: false };

    const user = await newUser.save();

    // send email to customer
    // await sendEmail({
    //     to: user.email,
    //     templateId: "d-96960805a9c14b43825c9981392e25e4",
    //     dynamicData: {
    //         customerFirstName: user.firstName,
    //         customerLastName: user.lastName,
    //     }
    // })

    return apiResponse(res, httpStatus.CREATED, {
        data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            services: user.services,
        },
        message: "Account Created. Please Verify Your number.",
    });
});

const otpVerify = catchAsync(async (req, res) => {
    const { userId, otp, phone } = req.body;
    const user = await UserModel.findOne(
        { $and: [{ _id: userId }, { "otp.otp": otp }] },
        {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            "verification.verified": true,
            services: true,
        }
    );
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Incorrect OTP. Try again!" });

    const updateOtpStatus = await UserModel.updateOne({ _id: user._id }, { "otp.verified": true });
    const { accessTokenDetail, refreshTokenDetail } = await accessTokenDetailAndRefreshTokenDetail(
        user,
        req.client._id
    );

    return apiResponse(res, httpStatus.ACCEPTED, {
        data: {
            access: {
                token: accessTokenDetail._id,
                expires: accessTokenDetail.expires,
            },
            refresh: {
                token: refreshTokenDetail._id,
                expires: refreshTokenDetail.expires,
            },
            user: user,
        },
        message: "OTP Verified.",
    });
});

const otpResend = catchAsync(async (req, res) => {
    const { userId, phone, email, resendBy } = req.body;
    const user = await UserModel.findOne({ $and: [{ _id: userId }, { email }, { phone }] });
    if (!user)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {
            message: `Invalid ${resendBy === "email" ? "email address." : "phone number."}`,
        });

    const otpMessage = `আপনার ওটিপি ${user.otp.otp}.`;
    // const otpMessage = `Your OTP is - ${user.otp.otp}.`
    const otpRes = await sms.sendSms(req.body.phone, otpMessage);
    if (otpRes) {
        return apiResponse(res, httpStatus.CREATED, {
            message: `OTP send to your ${resendBy === "email" ? "email address." : "phone number."}`,
        });
    } else {
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {
            message: "Couldn't send otp right now. please try again!",
        });
    }
});

const login = catchAsync(async (req, res) => {
    const { phone, countryId, email, uniAuth } = req.body;

    const condition = {};
    if (email) Object.assign(condition, { email });
    else if (phone && countryId) Object.assign(condition, { "phone.phone": phone, "phone.country._id": countryId });
    else return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid data." });

    const user = await UserModel.findOne(condition, {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        services: true,
    });
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid phone or email." });

    const randomOtp =
        uniAuth && uniAuth === process.env.UNI_AUTH
            ? process.env.UNI_OTP
            : Math.floor(Math.random() * (999999 - 100000) + 100000);
    // const randomOtp = 123456
    const otpMessage = `আপনার ভেরিফিকেশন কোডটি হলো - ${randomOtp}`;
    // const otpMessage = `Your OTP is - ${randomOtp}`
    console.log(otpMessage);

    if (phone) {
        const otpRes =
            uniAuth && uniAuth === process.env.UNI_AUTH ? true : await sms.sendSms(`+880${req.body.phone}`, otpMessage);
        if (otpRes) {
            const update = await UserModel.updateOne(
                { _id: user._id },
                { "otp.otp": randomOtp, "otp.verified": false }
            );
            return apiResponse(res, httpStatus.CREATED, {
                data: user,
                message: "OTP send to your phone number. Please verify.",
            });
        }
    } else if (email) {
        if (!uniAuth || uniAuth !== process.env.UNI_AUTH)
            await sendEmail({
                to: user.email,
                subject: "Unishopr Login OTP",
                text: otpMessage,
                // templateId: "d-96960805a9c14b43825c9981392e25e4",
                // dynamicData: {
                //     customerFirstName: user.firstName,
                //     customerLastName: user.lastName,
                // }
            });
    }

    const update = await UserModel.updateOne({ _id: user._id }, { "otp.otp": randomOtp, "otp.verified": false });
    return apiResponse(res, httpStatus.CREATED, {
        data: user,
        message: `OTP send to your ${email ? "email" : "phone number"}. Please verify.`,
    });
});

const socialLogin = catchAsync(async (req, res) => {
    const { email, accountType } = req.body;

    let user = await UserModel.findOne(
        { email },
        {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            "verification.verified": true,
            password: true,
            services: true,
        }
    );

    if (!user) {
        const newUser = new UserModel({ email, accountType });
        const err = newUser.validateSync();
        if (err instanceof mongoose.Error) {
            const valid = await validationError.requiredCheck(err.errors);
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Validation Required" }, valid);
        }

        user = await newUser.save();
    }

    const updateOtpStatus = await UserModel.updateOne({ _id: user._id }, { "otp.verified": true });
    const { accessTokenDetail, refreshTokenDetail } = await accessTokenDetailAndRefreshTokenDetail(
        user,
        req.client._id
    );

    return apiResponse(res, httpStatus.ACCEPTED, {
        data: {
            access: {
                token: accessTokenDetail._id,
                expires: accessTokenDetail.expires,
            },
            refresh: {
                token: refreshTokenDetail._id,
                expires: refreshTokenDetail.expires,
            },
            user: user,
        },
        message: "Signed In",
    });
});

const logout = catchAsync(async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (accessToken) {
        const accessDetails = await OAuthAccessTokenModel.findByIdAndUpdate(accessToken, { revoked: true });
        await OAuthRefreshTokenModel.updateOne({ accessToken: accessDetails._id }, { revoked: true });

        return apiResponse(res, httpStatus.ACCEPTED, {
            message: "Logout Successful",
        });
    }

    return apiResponse(res, httpStatus.UNAUTHORIZED, {
        message: "Session expired. Please login again.",
    });
});

const renew = catchAsync(async (req, res) => {
    const { access, refresh } = req.body;

    const accessDetail = await OAuthAccessTokenModel.findOne({ _id: access, revoked: false });
    const refreshDetail = await OAuthRefreshTokenModel.findOne({
        _id: refresh,
        accessToken: access,
        revoked: false,
        expires: { $gte: moment().format() },
    });

    if (accessDetail && refreshDetail) {
        const user = await UserModel.findOne(
            { _id: accessDetail.user },
            {
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                "verification.verified": true,
                services: true,
            }
        );

        await OAuthAccessTokenModel.updateOne({ _id: accessDetail._id }, { revoked: true });
        await OAuthRefreshTokenModel.updateOne({ _id: refreshDetail._id }, { revoked: true });
        const { accessTokenDetail, refreshTokenDetail } = await accessTokenDetailAndRefreshTokenDetail(
            user,
            req.client._id
        );

        return apiResponse(res, httpStatus.CREATED, {
            data: {
                access: {
                    token: accessTokenDetail._id,
                    expires: accessTokenDetail.expires,
                },
                refresh: {
                    token: refreshTokenDetail._id,
                    expires: refreshTokenDetail.expires,
                },
                user: user,
            },
            message: "Token Renewed.",
        });
    }

    return apiResponse(res, httpStatus.UNAUTHORIZED, {
        message: "Session expired. Please login again.",
    });
});

const lostPassword = catchAsync(async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email }, { password: true }).lean();
    if (!user)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This email isn't registered with our system." });

    //send email to reset password
    await sendEmail({
        to: email,
        templateId: "d-bbd2caff638845a395cc45c903394384",
        dynamicData: {
            resetPasswordLink: encodeURI(
                `${process.env.RESET_PASSWORD_REDIRECT}?_id=${user._id}&password=${user.password}`
            ),
        },
    });

    return apiResponse(res, httpStatus.CREATED, {
        message: "Check your email to update password.",
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const { _id, password, newPassword } = req.body;
    const userInfo = await UserModel.findOne({ _id, password });
    if (!userInfo) return apiResponse(res, httpStatus.BAD_REQUEST);

    const hashPass = await bcrypt.hash(newPassword, 8);
    const update = await UserModel.updateOne({ _id: _id }, { password: hashPass });

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Password Updated." });
});

module.exports = { login, socialLogin, register, renew, otpVerify, otpResend, logout, lostPassword, resetPassword };
