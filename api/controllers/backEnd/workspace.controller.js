const httpStatus = require("http-status");
const mongoose = require("mongoose");

const token = require("../../utils/token");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");
const sms = require("../../utils/sms")
const { updateCostAndValue, addToTimeline, leadToTravel } = require("../../utils/leads");
const { sendNotification } = require("../../utils/notification");

const { LeadModel, LeadStatus } = require("../../models/feLead.model");
const { TravelModel, TravelStatus } = require("../../models/feTravel.model");
const { CityModel } = require("../../models/feCity.model");
const { ProductModel, ProductStatus } = require("../../models/feProduct.model");
const { PaymentModel, PaymentStatus } = require("../../models/fePayment.model");
const { OrderModel } = require("../../models/feOrder.model");
const { UserModel, UserStatus, UserServicesStatus } = require("../../models/feUser.model")
const { CountryModel } = require("../../models/feCountry.model");
const { CouponModel, CouponStatus } = require("../../models/feCoupon.model");
const { LeadTimelineType } = require("../../models/feLeadTimeline.model");

const addLead = catchAsync(async (req, res) => {
    const {
        user,
        url,
        name,
        photo,
        cost,
        price,
        currency,
        quantity,
        weight,
        isBoxNeeded,
        description,
        route,
        checkout,
    } = req.body;

    const formData = {
        user,
        url,
        name,
        photo,
        cost,
        price,
        currency,
        quantity,
        weight,
        isBoxNeeded,
        description,
        checkout,
        leadId: "LD_1",
    }

    if (route.fromCityId && route.toCityId) {
        const fromCity = await CityModel.findOne({ _id: route.fromCityId }).populate("country._id").lean();
        if (!fromCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid From City" })

        const toCity = await CityModel.findOne({ _id: route.toCityId }).populate("country._id").lean();
        if (!toCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid To City" });

        if (fromCity && toCity) Object.assign(formData, { route: { from: { ...fromCity, country: fromCity.country._id }, to: { ...toCity, country: toCity.country._id } } })
    }

    const newLead = new LeadModel(formData);

    const err = newLead.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Required" }, validation);
    }

    const save = await newLead.save();
    if (!save) return apiResponse(res, httpStatus.BAD_REQUEST);

    if (save) await updateCostAndValue(save._id);
    return apiResponse(res, httpStatus.CREATED, { data: save, message: "Lead Created" });

});

const getLeads = catchAsync(async (req, res) => {
    const {
        page,
        perPage,
        users,
        productName,
        from,
        to,
        sort,
        status,
        leadDateFrom,
        leadDateTo,
        updatedDateFrom,
        updatedDateTo,
        leadId
    } = req.query;

    const filters = { status: { $ne: LeadStatus.deleted } };

    if (users) Object.assign(filters, { "user._id": { $in: users.split(",") } });
    if (productName) Object.assign(filters, { "name": { $regex: `.*${productName}.*`, $options: "i" } });
    if (from) Object.assign(filters, { "route.from._id": { $in: from.split(",") } });
    if (to) Object.assign(filters, { "route.to._id": { $in: to.split(",") } });
    if (status) Object.assign(filters, { "status": status });
    if (leadDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(leadDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (leadDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(leadDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })
    if (updatedDateFrom) Object.assign(filters, { "updatedAt": { $gte: new Date(`${new Date(updatedDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (updatedDateTo) Object.assign(filters, { "updatedAt": { ...filters.updatedAt, $lte: new Date(`${new Date(updatedDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })
    if (leadId) Object.assign(filters, { "leadId": { $regex: `.*${leadId}.*`, $options: "i" } });

    let leadSort = { createdAt: -1 }

    if (sort && sort === "weightDesc") leadSort = { weight: 1 }
    if (sort && sort === "weightAsc") leadSort = { weight: -1 }
    if (sort && sort === "costDesc") leadSort = { cost: 1 }
    if (sort && sort === "costAsc") leadSort = { cost: -1 }
    if (sort && sort === "priceDesc") leadSort = { price: 1 }
    if (sort && sort === "priceAsc") leadSort = { price: -1 }
    if (sort && sort === "createdAtDesc") leadSort = { createdAt: -1 }
    if (sort && sort === "createdAtAsc") leadSort = { createdAt: 1 }
    if (sort && sort === "updatedAtDesc") leadSort = { updatedAt: -1 }
    if (sort && sort === "updatedAtAsc") leadSort = { updatedAt: 1 }

    const leads = await LeadModel
        .find(filters)
        .populate("user._id", "phone email")
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort(leadSort)
        .lean()

    const total = await LeadModel.countDocuments(filters);
    const response = { page: parseInt(page), perPage: parseInt(perPage), total, data: leads }
    return apiResponse(res, httpStatus.OK, { data: response })
})

const getLead = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const lead = await LeadModel.findOne({ _id }).populate("user._id", "phone email address").lean();
    if (lead && lead._id) lead.order = await OrderModel.findOne({ "products.leadId": _id }, { orderId: true, "payment.transactionId": true, "payment.invoiceNo": true }).lean();
    // console.log(lead)
    return apiResponse(res, httpStatus.OK, { data: lead })
});

const updateLead = catchAsync(async (req, res) => {
    const { attributes, status, additional, ...body } = req.body;
    const { route } = req.body;
    const update = { ...body };

    if (attributes) Object.assign(update, { "checkout.attributes": attributes });
    if (additional) Object.assign(update, { "checkout.additional": additional });
    if (status) Object.assign(update, { status });

    if (route?.fromCityId && route?.toCityId) {
        const fromCity = await CityModel.findOne({ _id: route.fromCityId }).populate("country._id").lean();
        if (!fromCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid From City" })

        const toCity = await CityModel.findOne({ _id: route.toCityId }).populate("country._id").lean();
        if (!toCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid To City" });

        if (fromCity && toCity) Object.assign(update, { route: { from: { ...fromCity, country: fromCity.country._id }, to: { ...toCity, country: toCity.country._id } } })
    }

    const change = await LeadModel.updateOne({ _id: req.params._id }, update);
    if (change) await updateCostAndValue(req.params._id);

    const lead = await LeadModel.findOne({ _id: req.params._id }).populate("user._id", "phone").lean();

    if (status && status === LeadStatus.ongoing) {
        await addToTimeline(req.params._id, LeadTimelineType.ongoing)

        const phone = `${lead.user._id.phone.country.code}${lead.user._id.phone.phone}`
        const smsMessage = `আইটেম অ্যাপ্রুভ করা হয়েছে। কনফার্ম করতে নিচের লিঙ্কে ক্লিক করুন। https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`
        await sms.sendSms(phone, smsMessage)

        const notification = {
            userId: lead.user._id._id,
            title: "Order Approved",
            description: `Your order has been approved by Administration, Please confirm the order. https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`,
            photo: lead.photo,
            dataId: lead.leadId,
        };
        await sendNotification(notification)
    }
    if (status && status === LeadStatus.resolved) await addToTimeline(req.params._id, LeadTimelineType.resolved)

    if (status && status === LeadStatus.cancelled) {
        await addToTimeline(req.params._id, LeadTimelineType.cancelled)

        const notification = {
            userId: lead.user._id._id,
            title: "Order Cancelled",
            description: `Your order has been cancelled. https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`,
            photo: lead.photo,
            dataId: lead.leadId,
        };
        await sendNotification(notification)
    }

    if (additional) await addToTimeline(req.params._id, LeadTimelineType.additionalCharge)

    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" });
});

const addLeadUpdate = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const update = await LeadModel.updateOne({ _id }, {
        $push: { "updates": req.body }
    });

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "null" });
    return apiResponse(res, httpStatus.CREATED, { message: "Update Added" });
})

const updateLeadUpdate = catchAsync(async (req, res) => {
    const { _id, title, description } = req.body;
    const update = await LeadModel.updateOne({ _id: req.params._id, "updates._id": _id }, {
        $set: { "updates.$.title": title, "updates.$.description": description }
    })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "null" });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Update Updated" });
})

const deleteLeadUpdate = catchAsync(async (req, res) => {
    const update = await LeadModel.updateOne({ _id: req.params._id }, {
        $pull: { "updates": { _id: req.query.updateId } }
    })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "null" });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Update Deleted" });
})

const updateLeadAdditional = catchAsync(async (req, res) => {
    const { title, attributes, _id, totalAmount, totalCost, totalProfit } = req.body;

    const update = await LeadModel.updateOne({ _id: req.params._id, "checkout.additional._id": _id }, {
        $set: {
            "checkout.additional.$.title": title, "checkout.additional.$.attributes": attributes,
            "checkout.totalAmount": totalAmount, "checkout.totalCost": totalCost, "checkout.totalProfit": totalProfit
        }
    });

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "null" });
    if (update) await updateCostAndValue(req.params._id);
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Additional Updated" });
})

const leadsBulkImport = catchAsync(async (req, res) => {
    
    const leads = await LeadModel.findOne({}).sort({ createdAt: -1 })
    let lastLeadId = parseInt(leads.leadId.substring(3))

    const promises = req.body.map(async (item) => {
        item.leadId = "LD_" + ++lastLeadId;
        const userInfo = await UserModel.findOne({ email: item.email });
        item.user = {
            _id: userInfo._id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            photo: userInfo.photo,
        }
        item.quantity = parseInt(item.quantity);
        delete item.email
    });

    await Promise.all(promises);

    await LeadModel.insertMany(req.body)

    return apiResponse(res, httpStatus.ACCEPTED, { message: "Created" });
});

// Travels
const getTravels = catchAsync(async (req, res) => {

    const {
        page,
        perPage,
        users,
        from,
        to,
        travelDate,
        travelDateFrom,
        travelDateTo,
    } = req.query;

    const filters = { status: { $ne: TravelStatus.completed } };

    if (users) Object.assign(filters, { "user._id": { $in: users.split(",") } });
    if (from) Object.assign(filters, { "route.from._id": { $in: from.split(",") } });
    if (to) Object.assign(filters, { "route.to._id": { $in: to.split(",") } });
    if (travelDate) Object.assign(filters, { "travelDate": { $lte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T23:59:59.0Z`), $gte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })

    const travels = await TravelModel
        .find(filters)
        .populate("user._id", "phone email")
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 });

    const total = await TravelModel.countDocuments(filters)
    const response = { page: parseInt(page), perPage: parseInt(perPage), total, data: travels }
    return apiResponse(res, httpStatus.OK, { data: response })
})

const getTravel = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const travelInfo = await TravelModel.findOne({ _id })
        .populate("user._id", "phone")
        .populate("leads.user._id", "phone email")

    return apiResponse(res, httpStatus.OK, { data: travelInfo })
})

const addTravel = catchAsync(async (req, res) => {
    const { routeFrom, routeTo, user, weightCapacity, travelDate } = req.body;
    const fromCity = await CityModel.findOne({ _id: routeFrom });
    const toCity = await CityModel.findOne({ _id: routeTo });

    const newTravel = new TravelModel({
        travelId: "tv_1",
        user,
        route: { from: fromCity, to: toCity },
        weight: { capacity: weightCapacity, remaining: weightCapacity },
        travelDate
    });

    const isDuplicate = await TravelModel.findOne({
        "user._id": user._id,
        "travelDate": {
            $lte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T23:59:59.0Z`),
            $gte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T00:00:00.0Z`)
        },
        status: { $ne: TravelStatus.completed }
    })
    // console.log(isDuplicate)
    if (isDuplicate) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "More than one travel is not allowed on the same day" })

    const err = newTravel.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Validation Required" }, validation)
    }

    const save = await newTravel.save();
    const userInfo = await UserModel.findOne({ _id: user._id }, { services: true });
    if (save && userInfo?.services?.traveler && !userInfo.services.traveler.isTraveler) await UserModel.updateOne({ _id: user._id }, { "services.traveler.isTraveler": true, "services.traveler.status": UserServicesStatus.approved })

    return apiResponse(res, httpStatus.CREATED, { data: save, message: "Travel Created" })
})

const updateTravel = catchAsync(async (req, res) => {
    const { routeFrom, routeTo, weightCapacity, travelDate } = req.body;
    const fromCity = await CityModel.findOne({ _id: routeFrom });
    const toCity = await CityModel.findOne({ _id: routeTo });

    const updateTravel = {
        route: { from: fromCity, to: toCity },
        weight: { capacity: weightCapacity },
        travelDate
    }

    await TravelModel.updateOne({ _id: req.params._id }, updateTravel)
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" })
})

const deleteTravel = catchAsync(async (req, res) => {
    await TravelModel.updateOne({ _id: req.params._id }, { status: TravelStatus.completed })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Deleted" })
})

const getTravelLeads = catchAsync(async (req, res) => {
    const fromDate = '2023-03-21T00:00:00.000Z';
    const leads = await LeadModel.find({ status: LeadStatus.ordered, "travel.travelId": null, createdAt: { $gte: new Date(fromDate) }})
        .populate("user._id", "phone")
        .sort({ createdAt: -1 });
    return apiResponse(res, httpStatus.OK, { data: leads })
})

const addTravelLeads = catchAsync(async (req, res) => {
    const { travelId, leadId } = req.body;

    const lead = await LeadModel.findOne({ _id: leadId, status: LeadStatus.ordered }).populate("user._id", "phone").lean();
    if (!lead) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid lead." })

    const travel = await TravelModel.findOne({ _id: travelId, status: TravelStatus.upcoming })
    if (!travel) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid travel." })

    const existingLead = await TravelModel.findOne({ _id: travelId, "leads._id": leadId }, { _id: true });
    if (existingLead) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "The lead already exists to the travel." })

    if ((travel.weight.loaded + (lead.weight * lead.quantity)) > travel.weight.capacity)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Travel weight capacity exceeded." })

    await leadToTravel(travelId, leadId);
    return apiResponse(res, httpStatus.CREATED, { message: "Updated" })
})

const resolveTravel = catchAsync(async (req, res) => {
    const { _id, status } = req.body;
    await TravelModel.updateOne({ _id: req.params._id }, { status: status })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" })
})

// Product
const addProduct = catchAsync(async (req, res) => {
    const newProduct = new ProductModel({ ...req.body, productId: 1, sku: 1 });

    const err = newProduct.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Required" }, validation);
    }

    const save = await newProduct.save();
    return apiResponse(res, httpStatus.CREATED, { data: save, message: "Product Created" });
});

const getProducts = catchAsync(async (req, res) => {
    const { pageNo, perPageNo, nameSearch, priceSort } = req.query;
    const filters = { status: { $ne: ProductStatus.deleted } };
    let sort = { createdAt: -1 };

    nameSearch ? Object.assign(filters, { name: { $regex: `.*${nameSearch}.*` } }) : null;
    priceSort ? sort = { price: priceSort === 'ascend' ? 1 : -1 } : null;

    const products = await ProductModel
        .find(filters)
        .skip(parseInt(perPageNo) * (parseInt(pageNo) - 1))
        .limit(parseInt(perPageNo))
        .sort(sort);

    const total = await ProductModel.countDocuments({ status: { $ne: ProductStatus.deleted } });
    const response = { page: parseInt(pageNo), perPage: parseInt(perPageNo), total, data: products };
    return apiResponse(res, httpStatus.OK, { data: response });
})

const getProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const productInfo = await ProductModel.findOne({ _id: id })
    return apiResponse(res, httpStatus.OK, { data: productInfo })
})

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const update = await ProductModel.updateOne({ _id: id }, { $set: { ...req.body } })
    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" })
})

const updateProductStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const productInfo = await ProductModel.findOne({ _id: id })
    if (!productInfo) return apiResponse(res, httpStatus.BAD_REQUEST)

    const update = await ProductModel.updateOne({ _id: id }, {
        $set: { status: productInfo.status === ProductStatus.active ? ProductStatus.inactive : ProductStatus.active }
    })
    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" })
})

const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await ProductModel.updateOne({ _id: id }, { $set: { status: ProductStatus.deleted } })
    if (!deleteProduct) return apiResponse(res, httpStatus.BAD_REQUEST)
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Deleted" })
})

const addProductAttribute = catchAsync(async (req, res) => {
    const update = await ProductModel.updateOne({ _id: req.params.id }, {
        $push: { "attributes": req.body }
    })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
    return apiResponse(res, httpStatus.CREATED, { message: "Attribute added." })
});

const updateProductAttribute = catchAsync(async (req, res) => {
    const { _id, title, isRequired, isMultiple, position, maxSelection, options } = req.body;
    const update = await ProductModel.updateOne({ _id: req.params.id, "attributes._id": _id }, {
        $set: {
            "attributes.$.title": title,
            "attributes.$.position": position,
            "attributes.$.isRequired": isRequired,
            "attributes.$.isMultiple": isMultiple,
            "attributes.$.maxSelection": maxSelection,
            "attributes.$.options": options,
        }
    })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Attribute updated." })
});

const deleteProductAttribute = catchAsync(async (req, res) => {
    const update = await ProductModel.updateOne({ _id: req.params.id }, {
        $pull: { "attributes": { _id: req.query.attributeId } }
    })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Attribute deleted." })
});

// Payments
const getPayments = catchAsync(async (req, res) => {
    const {
        page,
        perPage,
        userIds,
        status,
        transactionIds,
        invoiceIds,
        invoiceNos,
        paymentDateFrom,
        paymentDateTo,
        sort
    } = req.query;

    const filters = { status: { $ne: PaymentStatus.deleted } };

    if (userIds) Object.assign(filters, { "user._id": { $in: userIds.split(",") } });
    if (status) Object.assign(filters, { "status": status });
    if (invoiceIds) Object.assign(filters, { "invoiceId": { $regex: `.*${invoiceIds}.*`, $options: "i" } });
    if (invoiceNos) Object.assign(filters, { "invoiceNo": { $regex: `.*${invoiceNos}.*`, $options: "i" } });
    if (transactionIds) Object.assign(filters, { "transactionId": { $regex: `.*${transactionIds}.*`, $options: "i" } });
    if (paymentDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(paymentDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (paymentDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(paymentDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })

    let paymentSort = { createdAt: -1 }

    if (sort && sort === "amountDesc") paymentSort = { amount: 1 }
    if (sort && sort === "amountAsc") paymentSort = { amount: -1 }
    if (sort && sort === "createdAtDesc") paymentSort = { createdAt: -1 }
    if (sort && sort === "createdAtAsc") paymentSort = { createdAt: 1 }

    const payments = await PaymentModel
        .find(filters)
        .populate("user._id", "phone email address")
        .populate("products.leadId", "url weight foreignCurrency foreignPrice currency price")
        .populate("couponId", "code")
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort(paymentSort)
        .lean();

    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];
        payment.order = await OrderModel
        .find({"payment._id": payment._id})
        .populate("products.leadId", "weight foreignCurrency foreignPrice currency checkout")
    }

    const total = await PaymentModel.countDocuments(filters)
    const response = { page: parseInt(page), perPage: parseInt(perPage), total, data: payments }
    return apiResponse(res, httpStatus.OK, { data: response })
})

const refundPayment = catchAsync(async (req, res) => {

    const { _id, transactionId, invoiceNo, amount } = req.body;

    if (transactionId && invoiceNo && amount) {
        // SSL Refund Request
        axios({
            method: 'get',
            url: process.env.SSL_REFUND_URL,
            params: {
                bank_tran_id: transactionId,
                refund_amount: amount,
                refund_remarks: 'Payment Refunded',
                format: 'json',
                refe_id: invoiceNo,
                store_id: process.env.SSL_STORE,
                store_passwd: process.env.SSL_PASS,
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async (response) => {
                if (response.data && response.data.status === 'success' && response.data.refund_ref_id) {
                    await PaymentModel.updateOne({ _id: _id }, { status: PaymentStatus.refunded });
                    await addToTimeline(req.params._id, LeadTimelineType.refunded)

                    const payment = await PaymentModel.findOne({ _id: _id }).populate("user._id", "phone").lean();

                    const notification = {
                        userId: payment.user._id._id,
                        title: "Payment Refunded",
                        description: `Your payment has been refunded. Invoice No: ${payment.invoiceNo}`,
                        photo: null,
                        dataId: payment.invoiceNo,
                    };
                    await sendNotification(notification)
                } else {
                    return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
                }
            })
            .catch((error) => {
                return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
            });

        return apiResponse(res, httpStatus.ACCEPTED, { message: "Amount Refunded" })
    }
})

const getPaymentsToDownload = catchAsync(async (req, res) => {
    const {
        userIds,
        status,
        transactionIds,
        invoiceIds,
        invoiceNos,
        paymentDateFrom,
        paymentDateTo
    } = req.query;

    const filters = { status: { $ne: PaymentStatus.deleted } };

    if (userIds) Object.assign(filters, { "user._id": { $in: userIds.split(",") } });
    if (status) Object.assign(filters, { "status": status });
    if (invoiceIds) Object.assign(filters, { "invoiceId": { $regex: `.*${invoiceIds}.*`, $options: "i" } });
    if (invoiceNos) Object.assign(filters, { "invoiceNo": { $regex: `.*${invoiceNos}.*`, $options: "i" } });
    if (transactionIds) Object.assign(filters, { "transactionId": { $regex: `.*${transactionIds}.*`, $options: "i" } });
    if (paymentDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(paymentDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (paymentDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(paymentDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })

    const payments = await PaymentModel
        .find(filters)
        .populate("user._id", "phone email")
        .populate("products.leadId", "url")
        .populate("couponId", "code")
        .sort({ createdAt: -1 })
        .lean()

    const arr = [["Invoice ID", "Customer Name", "Customer Number", "Products", "Amount", "Coupon", "Gateway", "Created At", "Status"]];
    payments.forEach((data, di) => arr.push([
        data?.invoiceId,
        `${data?.user?.firstName} ${data?.user?.lastName}`,
        `${data?.user?._id?.phone?.country?.code}${data?.user?._id?.phone?.phone}`,
        `${data?.products.map((product, pi) => pi % 2 === 0 ? `${product.name}` : `, ${product.name}`)}`,
        `${data?.amount}`,
        `${data?.couponId}`,
        `${data?.gateway}`,
        `${data?.createdAt}`,
        `${data?.status}`,
    ]))

    return apiResponse(res, httpStatus.OK, { data: arr })
})

const getPaymentInvoice = catchAsync(async (req, res) => {
    const {
        invoiceId
    } = req.query;

    console.log(invoiceId)

    const filters = { invoiceId, status: { $ne: PaymentStatus.deleted } };

    const payments = await PaymentModel
        .find(filters)
        .populate("user._id", "phone email address")
        .populate("products.leadId", "url weight foreignCurrency foreignPrice currency price")
        .populate("couponId", "code")
        .lean();

    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];
        payment.order = await OrderModel
        .find({"payment._id": payment._id})
        .populate("products.leadId", "weight foreignCurrency foreignPrice currency checkout")
    }

    return apiResponse(res, httpStatus.OK, { data: payments })
})

// Orders
const getOrders = catchAsync(async (req, res) => {
    const {
        page,
        perPage,
        userIds,
        status,
        orderId,
        leadId,
        invoiceId,
        invoiceNo,
        orderDateFrom,
        orderDateTo,
        sort
    } = req.query;

    const filters = {};

    if (userIds) Object.assign(filters, { "user._id": { $in: userIds.split(",") } });
    if (status) Object.assign(filters, { "status": status });
    if (invoiceId) Object.assign(filters, { "payment.invoiceId": { $regex: `.*${invoiceId}.*`, $options: "i" } });
    if (invoiceNo) Object.assign(filters, { "payment.invoiceNo": { $regex: `.*${invoiceNo}.*`, $options: "i" } });
    if (orderId) Object.assign(filters, { orderId: { $regex: `.*${orderId}.*`, $options: "i" } });
    if (leadId) Object.assign(filters, { "products.leadId": { $regex: `.*${leadId}.*`, $options: "i" } });
    if (orderDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(orderDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (orderDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(orderDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })

    let orderSort = { createdAt: -1 }

    if (sort && sort === "quantityDesc") orderSort = { "products.quantity": 1 }
    if (sort && sort === "quantityAsc") orderSort = { "products.quantity": -1 }
    if (sort && sort === "paidAmountDesc") orderSort = { "payment.paidAmount": 1 }
    if (sort && sort === "paidAmountAsc") orderSort = { "payment.paidAmount": -1 }
    // if (sort && sort === "foreignPriceDesc") orderSort = { "products[0].leadId.foreignCurrency": 1 }
    // if (sort && sort === "foreignPriceAsc") orderSort = { "products[0].leadId.foreignCurrency": -1 }
    if (sort && sort === "createdAtDesc") orderSort = { createdAt: -1 }
    if (sort && sort === "createdAtAsc") orderSort = { createdAt: 1 }

    const orders = await OrderModel
        .find(filters)
        .populate("user._id", "phone email address")
        .populate("products.leadId", "description url foreignCurrency foreignPrice route.from.name route.to.name travel")
        .skip(parseInt(perPage) * (parseInt(page) - 1))
        .limit(parseInt(perPage))
        .sort(orderSort)
        .lean()

    const total = await OrderModel.countDocuments(filters)
    const response = { page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: orders }
    return apiResponse(res, httpStatus.OK, { data: response })
})

const getOrdersToDownload = catchAsync(async (req, res) => {
    const {
        userIds,
        status,
        orderId,
        user,
        orderDateFrom,
        orderDateTo,
        paymentMethod
    } = req.query;

    const filters = {};
    if (userIds) Object.assign(filters, { "userId": { $in: userIds.split(",") } });
    if (status) Object.assign(filters, { "status": status });
    if (orderDateFrom) Object.assign(filters, { "createdAt": { $gte: new Date(`${new Date(orderDateFrom).toLocaleDateString('fr-CA')}T00:00:00.0Z`) } })
    if (orderDateTo) Object.assign(filters, { "createdAt": { ...filters.createdAt, $lte: new Date(`${new Date(orderDateTo).toLocaleDateString('fr-CA')}T23:59:59.0Z`) } })
    if (orderId) Object.assign(filters, { "orderId": { $regex: `.*${orderId}.*`, $options: "i" } });
    if (paymentMethod) Object.assign(filters, { "type": paymentMethod });

    const orders = await OrderModel
        .find(filters)
        .populate("user._id", "firstName lastName photo email phone address")
        .populate("products.leadId", "description url foreignCurrency foreignPrice weight route.from.name route.to.name")
        .sort({ createdAt: -1 })
        .lean();

    const arr = [["Order Date", "Invoice ID", "Order ID", "Products Name", "Products Description", "Product Link", "Product Quantity", "Price in BDT", "Price in FC", "EST Weight", "Gateway", "From", "To"]];
    orders.forEach((data, di) => arr.push([
        `${data?.createdAt}`,
        `${data?.payment?.invoiceId}`,
        data?.orderId,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.name}` : `${product?.name}`)}`,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.leadId?.description !== null ? product?.leadId?.description : '' }` : `${product?.leadId?.description !== null ? product?.leadId?.description : '' }`)}`,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.leadId?.url}` : `${product?.leadId?.url}`)}`,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.quantity}` : `${product?.quantity}`)}`,
        `BDT ${data?.payment?.amount}`,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.leadId?.foreignCurrency} ${product?.leadId?.foreignPrice}` : `${product?.leadId?.foreignCurrency} ${product?.leadId?.foreignPrice}`)}`,
        `${data?.products.map((product, pi) => pi !== 0 ? `, ${product?.leadId?.weight} KG` : `${product?.leadId?.weight} KG`)}`,
        `${data?.payment?.gateway}`,
        `${data?.products[0]?.leadId?.route?.from?.name}`,
        `${data?.products[0]?.leadId?.route?.to?.name}`,
    ]))

    return apiResponse(res, httpStatus.OK, { data: arr })
})

const updateOrder = catchAsync(async (req, res) => {
    const { _id, status } = req.body;
    const update = await OrderModel.updateOne({ _id: req.params.id }, { status })

    if (!update) return apiResponse(res, httpStatus.BAD_REQUEST, { message: null })
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Order updated." })
});

// coupons
const addCoupon = catchAsync(async (req, res) => {
    const {
        name,
        code,
        thumbnail,
        discount,
        description,
        maxUsage,
        maxAmount,
        status,
        userId
    } = req.body;

    const coupon = await CouponModel.findOne({ code: code.toUpperCase(), status: CouponStatus.active });
    if (coupon) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Use a unique coupon code" })

    const country = await CountryModel.findOne({ _id: req.body.country }, {
        name: true, code: true, latitude: true, longitude: true, currencySymbol: true, currencyFromDollar: true
    })

    const user = await UserModel.findOne({ _id: userId }, { _id: true, firstName: true, lastName: true, photo: true });

    const newCoupon = new CouponModel({
        user,
        name,
        code: code.toUpperCase(),
        thumbnail,
        discount,
        description,
        maxUsage,
        maxAmount,
        country,
        status,
    });

    const err = newCoupon.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Validation Required" }, validation);
    }

    const save = await newCoupon.save();
    return apiResponse(res, httpStatus.CREATED, { data: save, message: "Coupon Created" });
});

const updateCoupon = catchAsync(async (req, res) => {
    const {
        name,
        code,
        thumbnail,
        discount,
        description,
        maxUsage,
        maxAmount,
        status,
        userId
    } = req.body;

    const coupon = await CouponModel.findOne({ code: code.toUpperCase(), status: CouponStatus.active });
    if (coupon && coupon._id != req.params._id) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Use a unique coupon code" })

    const country = await CountryModel.findOne({ _id: req.body.country }, {
        name: true, code: true, latitude: true, longitude: true, currencySymbol: true, currencyFromDollar: true
    })

    const user = await UserModel.findOne({ _id: userId }, { _id: true, firstName: true, lastName: true, photo: true });

    await CouponModel.updateOne({ _id: req.params._id }, {
        $set: {
            user,
            name,
            code: code.toUpperCase(),
            thumbnail,
            discount,
            country,
            description,
            maxUsage,
            maxAmount,
            status,
        }
    });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Updated" });
});

const getCoupons = catchAsync(async (req, res) => {
    const coupons = await CouponModel
        .find({ status: { $ne: CouponStatus.deleted } })
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({ createdAt: -1 });

    const total = await CouponModel.countDocuments({ status: { $ne: CouponStatus.deleted } });
    const response = { page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: coupons };
    return apiResponse(res, httpStatus.OK, { data: response });
});

const getCoupon = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const couponInfo = await CouponModel.findOne({ _id });
    return apiResponse(res, httpStatus.OK, { data: couponInfo })
});

const deleteCoupon = catchAsync(async (req, res) => {
    await CouponModel.updateOne({ _id: req.params._id }, { $set: { status: CouponStatus.deleted } });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Deleted" });
});


module.exports = {
    addLead, getLeads, getLead, updateLead, addLeadUpdate, updateLeadUpdate, deleteLeadUpdate, leadsBulkImport,
    getTravels, getTravel, addTravel, updateTravel, deleteTravel, getTravelLeads, addTravelLeads, resolveTravel,
    addProduct, getProducts, getProduct, updateProduct, deleteProduct, updateProductStatus, addProductAttribute, deleteProductAttribute, updateProductAttribute,
    getPayments, refundPayment, getPaymentsToDownload, getPaymentInvoice,
    getOrders, updateOrder, getOrdersToDownload,
    updateLeadAdditional,
    addCoupon, getCoupons, getCoupon, deleteCoupon, updateCoupon,
};
