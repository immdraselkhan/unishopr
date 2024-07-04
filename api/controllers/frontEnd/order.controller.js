const mongoose = require("mongoose");
const httpStatus = require("http-status");

const token = require("../../utils/token");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");
const { addToTimeline } = require("../../utils/leads");
const { sendNotification } = require("../../utils/notification");

const { LeadModel, LeadStatus } = require("../../models/feLead.model");
const { CityModel, CityStatus } = require("../../models/feCity.model");
const { CountryModel } = require("../../models/feCountry.model");
const {PaymentModel, PaymentStatus} = require("../../models/fePayment.model");
const {OrderModel, OrderStatus} = require("../../models/feOrder.model");
const { LeadTimelineType } = require("../../models/feLeadTimeline.model");

const getLeads = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const {status} = req.query;
    const filters = {"user._id": userId};

    if (status && status === "checkout") Object.assign(filters, {status: LeadStatus.checkout})
    else if (status && status === "cancelled") Object.assign(filters, {status: LeadStatus.cancelled})
    else if (status && status === "additional") Object.assign(filters, {"checkout.additional.0": { $exists: true }, "checkout.additional.isPaid": false})
    else Object.assign(filters, {$or: [{status: LeadStatus.pending}, {status: LeadStatus.resolved}, {status: LeadStatus.checkout}, {status: LeadStatus.ongoing}]})

    const leads = await LeadModel.find(filters)
        .populate("user._id", "email")
        .populate("travel.user._id", "services.traveler.overview")
        .sort({ createdAt: -1 })
        .lean();

    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        const payment = await PaymentModel.findOne({"products.leadId": lead._id, "user._id": userId, status: PaymentStatus.completed}, {invoiceNo: true, transactionId: true, platform: true, gateway: true, createdAt: true, updatedAt: true}).lean();
        Object.assign(lead, {payment});
    }

    return apiResponse(res, httpStatus.OK, { data: leads });
});

const addLead = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const {
        leadId,
        url,
        name,
        photo,
        price,
        currency,
        quantity,
        weight,
        isBoxNeeded,
        description,
        route,
        checkout,
    } = req.body;

    const body = {};
    if (name) Object.assign(body, { name })
    if (photo) Object.assign(body, { photo })
    if (price) Object.assign(body, { price })
    if (currency) Object.assign(body, { currency })
    if (quantity) Object.assign(body, { quantity })
    if (weight) Object.assign(body, { weight })
    if (isBoxNeeded) Object.assign(body, { isBoxNeeded })
    if (description) Object.assign(body, { description })
    if (checkout) Object.assign(body, { checkout })

    if (route.fromCityId && route.toCityId) {
        const fromCity = await CityModel.findOne({ _id: route.fromCityId }).populate("country._id").lean();
        if (!fromCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid From City" })

        const toCity = await CityModel.findOne({ _id: route.toCityId }).populate("country._id").lean();
        if (!toCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid To City" });

        if (fromCity && toCity) Object.assign(body, { route: { from: { ...fromCity, country: fromCity.country._id }, to: { ...toCity, country: toCity.country._id } } })
    }

    if (leadId) {
        const update = await LeadModel.findOneAndUpdate({ _id: leadId }, body);
        return apiResponse(res, httpStatus.CREATED, { data: update, message: "Lead Created" });
    } else {
        const newLead = new LeadModel({ ...body, user, url, leadId: "ld_1" });

        const err = newLead.validateSync();
        if (err instanceof mongoose.Error) {
            const validation = await validationError.requiredCheck(err.errors);
            return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Required" }, validation);
        }

        const save = await newLead.save();
        return apiResponse(res, httpStatus.CREATED, { data: save, message: "Lead Created" });
    }
});

const getOrders = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const {status} = req.query;
    const filters = {"user._id": userId};

    if (status && status === "completed") Object.assign(filters, {$or: [{status: OrderStatus.placed}, {status: OrderStatus.confirmed}]})
    if (status && status === "inTransit") Object.assign(filters, {status: OrderStatus.dispatched});
    if (status && status === "received") Object.assign(filters, {status: OrderStatus.delivered});
    if (status && status === "cancelled") Object.assign(filters, {status: OrderStatus.cancelled});

    const orders = await OrderModel.find(filters)
        .populate("user._id", "email")
        .populate("products.leadId", "url travel route updates checkout")
        .sort({ createdAt: -1 })
        .lean();

    return apiResponse(res, httpStatus.OK, { data: orders });
});

const updateLead = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })
    
    const {
        leadId,
        status
    } = req.body;
    
    const update = { status };

    await LeadModel.updateOne({ _id: leadId }, update);

    const lead = await LeadModel.findOne({ _id: leadId }).populate("user._id", "phone").lean();

    if (status && status === LeadStatus.resolved) {
        await addToTimeline(leadId, LeadTimelineType.resolved)

        const notification = {
            userId: lead.user._id._id,
            title: "Order Confirmed",
            description: `You've confirmed your order, please wait for a traveler to be assigned. https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`,
            photo: lead.photo,
            dataId: lead.leadId,
        };
        await sendNotification(notification)
    }

    if (status && status === LeadStatus.cancelled) {
        await addToTimeline(leadId, LeadTimelineType.cancelled)

        const notification = {
            userId: lead.user._id._id,
            title: "Order Cancelled",
            description: `You have cancelled your order. https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`,
            photo: lead.photo,
            dataId: lead.leadId,
        };
        await sendNotification(notification)
    }

    if (status && status === LeadStatus.resolved) return apiResponse(res, httpStatus.ACCEPTED, { message: "Order confirmed" });
    if (status && status === LeadStatus.cancelled) return apiResponse(res, httpStatus.ACCEPTED, { message: "Order cancelled" });
});

module.exports = { getLeads, addLead, getOrders, updateLead };
