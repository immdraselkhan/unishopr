const httpStatus = require("http-status");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");

const {UserModel} = require("../../models/feUser.model");
const {PaymentModel, PaymentStatus} = require("../../models/fePayment.model");
const {OAuthAccessTokenModel} = require("../../models/feOAuthAccessToken.model");
const {OrderModel, OrderStatus} = require("../../models/feOrder.model");

const getUsersStats = catchAsync(async (req, res) => {
    const date      = new Date();
    const firstDay  = new Date(date.getFullYear(), date.getMonth(), 1);
    const prev6thMonthFirstDay = new Date(date.getFullYear(), (date.getMonth()-5), 1);
    const monthArray = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const thisMonth = await UserModel.countDocuments({createdAt: {$gte: firstDay}});
    const total = await UserModel.countDocuments();
    const percentage = ((thisMonth/total)*100).toFixed(1);

    const stats = await UserModel.aggregate(
        [
            { $match: { createdAt: {$gte: prev6thMonthFirstDay} } },
            { $group: { _id: {year: { $year: "$createdAt" }, month: {$month: "$createdAt"}}, count: { $sum: 1 } } },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $addFields: { month: { $let: { vars: { monthsInString: monthArray }, in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] } } } } },
        ]
    );

    return apiResponse(res, httpStatus.OK, {data: {total, percentage, stats}});
});

const getPurchasesStats = catchAsync(async (req, res) => {
    const date      = new Date();
    const firstDay  = new Date(date.getFullYear(), date.getMonth(), 1);
    const prev6thMonthFirstDay = new Date(date.getFullYear(), (date.getMonth()-5), 1);
    const monthArray = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const thisMonth = await OrderModel.countDocuments({createdAt: {$gte: firstDay}});
    const total = await OrderModel.countDocuments();
    const percentage = ((thisMonth/total)*100).toFixed(1);

    const stats = await OrderModel.aggregate(
        [
            { $match: { createdAt: {$gte: prev6thMonthFirstDay} } },
            { $group: { _id: {year: { $year: "$createdAt" }, month: {$month: "$createdAt"}}, count: { $sum: 1 } } },
            { $sort: {"_id.year": 1, "_id.month": 1} },
            { $addFields: { month: { $let: { vars: { monthsInString: monthArray }, in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] } } } } },
        ]
    );

    return apiResponse(res, httpStatus.OK, {data: {total, percentage, stats}});
});

const getRevenueStats = catchAsync(async (req, res) => {
    const date      = new Date();
    const firstDay  = new Date(date.getFullYear(), date.getMonth(), 1);
    const prev6thMonthFirstDay = new Date(date.getFullYear(), (date.getMonth()-5), 1);
    const monthArray = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const thisMonth = await PaymentModel.aggregate([
        { $match: { createdAt: { $gte: firstDay }, status: PaymentStatus.completed } },
        { $group: { _id: null, total : { $sum : "$paidAmount" } } }
    ]);

    const total = await PaymentModel.aggregate([
        { $match: { status: PaymentStatus.completed } },
        { $group: { _id: null, total : { $sum : "$paidAmount" } } },
    ]);

    const stats = await PaymentModel.aggregate(
        [
            { $match: { createdAt: {$gte: prev6thMonthFirstDay}, status: PaymentStatus.completed } },
            { $group: { _id: {year: { $year: "$createdAt" }, month: {$month: "$createdAt"}}, count: { $sum: "$paidAmount" } } },
            { $sort: {"_id.year": 1, "_id.month": 1} },
            { $addFields: { month: { $let: { vars: { monthsInString: monthArray }, in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] } } } } },
        ]
    );

    let percentage = 0;
    if (total && total.length && thisMonth && thisMonth.length)
        percentage = ((thisMonth[0].total/total[0].total)*100).toFixed(1)

    return apiResponse(res, httpStatus.OK, {data: {total: total && total.length ? total[0].total : 0, percentage, stats}});
});

module.exports = {
    getUsersStats,
    getPurchasesStats,
    getRevenueStats,
};
