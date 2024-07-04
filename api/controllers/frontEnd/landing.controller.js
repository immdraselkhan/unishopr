const httpStatus = require("http-status");

const token = require("../../utils/token");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");

const { ProductModel, ProductStatus } = require("../../models/feProduct.model");
const { BannerModel, BannerStatus } = require("../../models/feBanner.model");
const { BrandModel, BrandStatus } = require("../../models/feBrands.model");
const { NotificationModel, NotificationStatus } = require("../../models/feNotification.model");

const product = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const product = await ProductModel.findOne({ _id }).lean();
    return apiResponse(res, httpStatus.OK, { data: product });
})

const banners = catchAsync(async (req, res) => {
    const banners = await BannerModel.find({ status: BannerStatus.active }).sort({ position: 1 });
    return apiResponse(res, httpStatus.OK, { data: banners });
})

const brands = catchAsync(async (req, res) => {
    const brands = await BrandModel.find({ status: BrandStatus.active }).sort({ position: 1 });
    return apiResponse(res, httpStatus.OK, { data: brands });
})

const getNotifications = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    const notifications = await NotificationModel.find({"user._id": userId, status: NotificationStatus.sent}).sort({ createdAt: -1 });
    return apiResponse(res, httpStatus.OK, { data: notifications });
});

const updateNotifications = catchAsync(async (req, res) => {
    const { userId } = req.body
    await NotificationModel.updateMany({"user._id": userId}, { $set: { status: NotificationStatus.seen } });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Notification Updated" });
});

module.exports = {
    product, banners, brands, getNotifications, updateNotifications
}
