const httpStatus = require("http-status");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");

const {RoleModel, RoleStatus} = require("../../models/beRole.model");
const {DepartmentModel, DepartmentStatus} = require("../../models/beDepartment.model");
const {CountryModel, CountryStatus} = require("../../models/feCountry.model");
const {CityModel, CityStatus} = require("../../models/feCity.model");
const {LocationModel, LocationStatus} = require("../../models/feLocation.model");
const {CategoryModel, CategoryStatus} = require("../../models/feCategory.model");
const {SubCategoryModel} = require("../../models/feSubCategory.model");
const {ChildCategoryModel} = require("../../models/feChildCategory.model");
const {UserModel, UserStatus} = require("../../models/feUser.model")
const {TagModel} = require("../../models/feTag.model");
const {LeadAttributeModel, LeadAttributeStatus} = require("../../models/feLeadAttribute.model");
const {LeadTimelineModel, LeadTimelineStatus} = require("../../models/feLeadTimeline.model");

const getRoles = catchAsync(async (req, res) => {
    const roles = await RoleModel.find({ status: { $eq: RoleStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: roles});
});

const getDepartments = catchAsync(async (req, res) => {
    const departments = await DepartmentModel.find({ status: { $eq: DepartmentStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: departments});
});

const getCountries = catchAsync(async (req, res) => {
    const countries = await CountryModel.find({ status: { $eq: CountryStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: countries});
});

const getCities = catchAsync(async (req, res) => {
    const {countryId} = req.query;
    const conditions = {status: CityStatus.active};
    countryId ? Object.assign(conditions, {"country._id": countryId}) : null;

    const cities = await CityModel.find(conditions).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: cities});
});

const getLocations = catchAsync(async (req, res) => {
    const {countryId, cityId} = req.query;

    const conditions = {status: LocationStatus.active};
    countryId ? Object.assign(conditions, {"country._id": countryId}) : null;
    cityId ? Object.assign(conditions, {"city._id": cityId}) : null;

    const cities = await LocationModel.find(conditions).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: cities});
});

const getCategories = catchAsync(async (req, res) => {
    const categories = await CategoryModel.find({ status: { $eq: CategoryStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: categories});
});

const getSubCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params;
    const subCategoryInfo = await SubCategoryModel.find({"category._id": categoryId}).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: subCategoryInfo})
});

const getChildCategory = catchAsync(async (req, res) => {
    const {subCategoryId} = req.params;
    const childCategoryInfo = await ChildCategoryModel.find({"subCategory._id": subCategoryId}).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: childCategoryInfo})
});

const getTags = catchAsync(async (req, res) => {
    const tags = await TagModel.find({ status: { $eq: CategoryStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: tags});
});

const getLeadAttributes = catchAsync(async (req, res) => {
    const leadAttributes = await LeadAttributeModel.find({ status: { $eq: LeadAttributeStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: leadAttributes});
});

const getLeadTimelines = catchAsync(async (req, res) => {
    const leadTimelines = await LeadTimelineModel.find({ status: { $eq: LeadTimelineStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: leadTimelines});
});

const getUser = catchAsync(async (req, res) => {
    const {email, phone} = req.query;
    const conditions = {status: UserStatus.active};

    email ? Object.assign(conditions, {email}) : null;
    phone ? Object.assign(conditions, {phone}) : null;

    const user = await UserModel.findOne(conditions, {firstName: true, lastName: true, photo: true, email: true, phone: true});
    return apiResponse(res, httpStatus.OK, {data: user});
});

const getUsers = catchAsync(async (req, res) => {
    const {_ids, name, email, phone, search} = req.query;
    const filters = {status: {$ne: UserStatus.deleted}};

    if (_ids) Object.assign(filters, { _id: {$in: _ids.split(",")} });
    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, {"email" : {$regex: `.*${email}.*`, $options: "i"}});
    if (phone) Object.assign(filters, {"phone.phone" : {$regex: `.*${phone}.*`, $options: "i"}});
    if (search) Object.assign(filters, {$or: [{"firstName" : {$regex: `.*${search}.*`, $options: "i"}}, {"lastName" : {$regex: `.*${search}.*`, $options: "i"}}, {"phone.phone" : {$regex: `.*${search}.*`, $options: "i"}}, {"email" : {$regex: `.*${search}.*`, $options: "i"}}]});

    const users = await UserModel.find(filters, {firstName: true, lastName: true, photo: true, email: true, phone: true}).limit(5);
    return apiResponse(res, httpStatus.OK, {data: users});
})

const travelers = catchAsync(async (req, res) => {
    const {ids, name, email, phone} = req.query;

    const filters = {"services.traveler.isTraveler": true, status: {$ne: UserStatus.deleted}};

    if (ids) Object.assign(filters, {_id: {$in: ids.split(",")}});
    if (name) Object.assign(filters, { $or: [{ firstName: { $regex: `.*${name}.*`, $options: "i" } }, { lastName: { $regex: `.*${name}.*`, $options: "i" } }] });
    if (email) Object.assign(filters, {"firstName" : {$regex: `.*${email}.*`, $options: "i"}});
    if (phone) Object.assign(filters, {"phone.phone" : {$regex: `.*${phone}.*`, $options: "i"}});

    const travelers = await UserModel.find(filters, {firstName: true, lastName: true, phone: true, email: true,}).limit(5);
    return apiResponse(res, httpStatus.OK, {data: travelers});
})

module.exports = {
    getRoles,
    getDepartments,
    getCountries,
    getCities,
    getLocations,
    getCategories,
    getSubCategory,
    getChildCategory,
    getUser,
    getUsers,
    travelers,
    getTags,
    getLeadAttributes,
    getLeadTimelines,
};
