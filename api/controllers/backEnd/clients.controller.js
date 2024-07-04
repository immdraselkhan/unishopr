const httpStatus = require("http-status");
const mongoose = require("mongoose");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");

const { UserModel, UserServicesStatus, UserStatus } = require("../../models/feUser.model")
const { TravelModel } = require("../../models/feTravel.model");
const { OrderModel } = require("../../models/feOrder.model");
const { PaymentModel } = require("../../models/fePayment.model");

const addUser = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, gender, photo } = req.body;
    const newUser = new UserModel({ firstName, lastName, email, phone, gender, photo });

    const validation = await validationError.uniqueCheck(await UserModel.isUnique(email, { countryId: phone.country._id, phone: phone.phone }));
    if (Object.keys(validation).length !== 0)
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Error" }, validation);

    const err = newUser.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Required" }, validation);
    }

    const save = await newUser.save();
    return apiResponse(res, httpStatus.CREATED, { data: save, message: "User Created" });
})

const updateUser = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, _id, photo } = req.body;

    const user = await UserModel.updateOne({ _id }, { $set: { firstName, lastName, email, phone, photo } });
    return apiResponse(res, httpStatus.ACCEPTED, { data: user, message: "User Updated" });
})

const getUsers = catchAsync(async (req, res) => {
    const {
        perPage,
        page,
        name,
        email,
        phone,
        gender,
        createdDateFrom,
        createdDateTo,
    } = req.query

    const filters = { status: { $ne: UserStatus.deleted } };

    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, { "email": { $regex: `.*${email}.*`, $options: "i" } });
    if (phone) Object.assign(filters, { "phone.phone": { $regex: `.*${phone}.*`, $options: "i" } });
    if (gender) Object.assign(filters, { "gender": gender });
    if (createdDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(createdDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (createdDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(createdDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })

    const data = await UserModel
        .find(filters, { firstName: true, lastName: true, phone: true, photo: true, email: true, gender: true, accountType: true, services: true, createdAt: true })
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 })
        .lean();

    const total = await UserModel.countDocuments(filters);
    return apiResponse(res, httpStatus.OK, { data: { page: parseInt(page), perPage: parseInt(perPage), total, data } });
})

const getUsersToDownload = catchAsync(async (req, res) => {
    const {
        name,
        email,
        phone,
        gender,
        createdDateFrom,
        createdDateTo,
    } = req.query;

    const filters = { status: { $ne: UserStatus.deleted } };

    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, { "email": { $regex: `.*${email}.*`, $options: "i" } });
    if (phone) Object.assign(filters, { "phone.phone": { $regex: `.*${phone}.*`, $options: "i" } });
    if (gender) Object.assign(filters, { "gender": gender });
    if (createdDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(createdDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (createdDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(createdDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })

    const users = await UserModel
        .find(filters, { firstName: true, lastName: true, phone: true, photo: true, email: true, gender: true, accountType: true, services: true, createdAt: true })
        .sort({ createdAt: -1 })
        .lean();

    const arr = [["User Name", "Email", "Phone"]];

    users.forEach((data, di) => arr.push([
        `${data?.firstName} ${data?.lastName}`,
        `${data?.email}`,
        `${data?.phone?.country?.code}${data?.phone?.phone}`,
    ]))

    return apiResponse(res, httpStatus.OK, { data: arr })
})

const getUser = catchAsync(async (req, res) => {
    const { _id } = req.params;

    const userInfo = await UserModel.findOne({ _id }).lean();

    const userPayments = await PaymentModel.find({ "user._id": _id }).lean();
    const userOrders = await OrderModel
    .find({ "user._id": _id })
    .populate("user._id", "phone email address")
    .populate("products.leadId", "description url foreignCurrency foreignPrice route.from.name route.to.name")
    .lean();
    const travelerTravels = await TravelModel.find({ "user._id": _id }).lean();
    return apiResponse(res, httpStatus.OK, {
        data: {
            userInfo,
            userPayments,
            userOrders,
            travelerTravels
        }
    });
})

const getTravelers = catchAsync(async (req, res) => {
    const {
        perPage,
        page,
        name,
        email,
        phone,
        gender,
    } = req.query

    const filters = { "services.traveler.isTraveler": true, status: { $ne: UserStatus.deleted } };

    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, { "email": { $regex: `.*${email}.*`, $options: "i" } });
    if (phone) Object.assign(filters, { "phone.phone": { $regex: `.*${phone}.*`, $options: "i" } });
    if (gender) Object.assign(filters, { "gender": gender });

    const data = await UserModel
        .find(filters, { firstName: true, lastName: true, phone: true, photo: true, email: true, gender: true, "services.traveler": true })
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 });

    const total = await UserModel.countDocuments(filters);
    return apiResponse(res, httpStatus.OK, { data: { page: parseInt(page), perPage: parseInt(perPage), total, data } });
})

const updateTraveler = catchAsync(async (req, res) => {
    const { overview, _id } = req.body;
    await UserModel.updateOne({ _id }, {
        $set:
        {
            "services.traveler.overview": overview,
        }
    })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Traveler Updated" });
})

const travelerRequest = catchAsync(async (req, res) => {
    const { overview, _id } = req.body;

    await UserModel.updateOne({ _id }, {
        "services.traveler.isTraveler": true,
        "services.traveler.overview": overview,
        "services.traveler.status": UserServicesStatus.requested
    })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Traveler Request Accepted" });
})

const travelersApprove = catchAsync(async (req, res) => {
    const { travelerId } = req.body

    await UserModel.updateOne({ _id: travelerId }, { "services.traveler.status": UserServicesStatus.approved })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Traveler Approved" });
})

const getPartners = catchAsync(async (req, res) => {
    const {
        perPage,
        page,
        name,
        email,
        phone,
        gender,
    } = req.query

    const filters = { "services.partner.isPartner": true, status: { $ne: UserStatus.deleted } };

    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, { "email": { $regex: `.*${email}.*`, $options: "i" } });
    if (phone) Object.assign(filters, { "phone.phone": { $regex: `.*${phone}.*`, $options: "i" } });
    if (gender) Object.assign(filters, { "gender": gender });

    const data = await UserModel
        .find(filters, { firstName: true, lastName: true, phone: true, photo: true, email: true, gender: true, "services.partner": true })
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 });

    const total = await UserModel.countDocuments(filters);
    return apiResponse(res, httpStatus.OK, { data: { page: parseInt(page), perPage: parseInt(perPage), total, data } });
})

const updatePartner = catchAsync(async (req, res) => {
    const { overview, _id } = req.body;
    await UserModel.updateOne({ _id }, {
        $set:
        {
            "services.partner.overview": overview,
        }
    })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Partner Updated" });
})

const partnerRequest = catchAsync(async (req, res) => {
    const { overview, _id } = req.body;

    await UserModel.updateOne({ _id }, {
        "services.partner.isPartner": true,
        "services.partner.overview": overview,
        "services.partner.status": UserServicesStatus.requested
    })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Partner Request Accepted" });
})

const partnersApprove = catchAsync(async (req, res) => {
    const { partnerId } = req.body

    await UserModel.updateOne({ _id: partnerId }, { "services.partner.status": UserServicesStatus.approved })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Partner Approved" });
})

module.exports = {
    addUser,
    updateUser,
    getUsers,
    getUsersToDownload,
    getUser,
    getTravelers,
    updateTraveler,
    travelerRequest,
    travelersApprove,
    getPartners,
    updatePartner,
    partnerRequest,
    partnersApprove,
}
