const httpStatus = require("http-status");
const axios = require("axios");
const mongoose = require("mongoose");

const token = require("../../utils/token");
const { objectToFormData } = require("../../utils/form");
const { initiatePayment } = require("../../utils/payment");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");
const { addToTimeline } = require("../../utils/leads");
const { sendNotification } = require("../../utils/notification");

const { PaymentModel, PaymentStatus, PaymentGateway } = require("../../models/fePayment.model");
const { UserModel } = require("../../models/feUser.model");
const { ProductModel } = require("../../models/feProduct.model");
const { LeadModel, LeadStatus } = require("../../models/feLead.model");
const { OrderModel, OrderType, OrderStatus } = require("../../models/feOrder.model");
const { TravelModel, TravelStatus } = require("../../models/feTravel.model");
const { CouponModel, CouponStatus } = require("../../models/feCoupon.model");
const { LeadTimelineType } = require("../../models/feLeadTimeline.model");

const sslPayment = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." });

    const {
        firstName,
        lastName,
        phone,
        address,
        products,
        couponId,
        redirectUrl,
        paymentFrom,
        amount,
        price
    } = req.body;

    await UserModel.updateOne({ _id: user._id }, { address: [ {addressLine1: address, firstName: firstName, lastName, phone }]});

    let stockUpdated = { isUpdated: true, product: "" };
    for (let i = 0; i < products.length; i++) {
        if (products[i].type === "shop") {
            const product = await ProductModel.findOne({ _id: products[i]._id }, { stock: true, name: true });
            if (product.stock.quantity < products[i].quantity) stockUpdated = { isUpdated: false, product: product.name };
        }
    }
    if (!stockUpdated.isUpdated) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: `Not enough stock for "${stockUpdated.product}" Please remove the product from cart.` });

    const initiatePaymentRes = await initiatePayment({
        user,
        products,
        couponId,
        amount,
        price,
        gateway: 'sslcommerz',
        paymentFrom,
    })
    if (!initiatePaymentRes) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "Couldn't initiate payment" })

    const postData = {
        store_id: process.env.SSL_STORE,
        store_passwd: process.env.SSL_PASS,
        total_amount: initiatePaymentRes.amount,
        currency: "BDT",
        tran_id: initiatePaymentRes.invoiceNo,
        ipn_url: `${process.env.BASE_HOST_PATH}/front-end/payment/ssl-ipn`,
        success_url: `${process.env.BASE_HOST_PATH}/front-end/payments/ssl-redirect?status=success`,
        fail_url: `${process.env.BASE_HOST_PATH}/front-end/payments/ssl-redirect?status=failed`,
        cancel_url: `${process.env.BASE_HOST_PATH}/front-end/payments/ssl-redirect?status=cancelled`,
        emi_option: 0,
        cus_name: `${user.firstName} ${user.lastName}`,
        cus_email: user.email,
        cus_add1: "Demo Address",
        cus_city: "Dhaka",
        cus_country: 'Bangladesh',
        cus_phone: `${user?.phone?.country?.code}${user?.phone?.phone}`,
        shipping_method: 'NO',
        num_of_item: 1,
        product_name: 'PRODUCT_PAYMENT',
        product_category: 'PRODUCT_PAYMENT',
        product_profile: 'PRODUCT_PAYMENT',
        value_a: initiatePaymentRes._id,
        value_b: user._id,
        value_c: redirectUrl,
        value_d: couponId ?? null,
    }

    const form = await objectToFormData(postData);
    await axios({
        method: "post",
        url: process.env.SSL_URL,
        data: form,
        headers: form.getHeaders(),
    }).then((response) => {
        if (response.data && response.data.GatewayPageURL)
            return apiResponse(res, httpStatus.CREATED, { data: response.data, message: "Initiating Payment..." })
    }).catch(() => apiResponse(res, httpStatus.BAD_REQUEST, { message: "Couldn't initiate payment" }))

    return apiResponse(res, httpStatus.BAD_REQUEST, { message: "Couldn't initiate payment" })
})

const sslPaymentIpn = catchAsync(async (req, res) => {
    if (req.body && req.body.status === "VALID" && req.body.val_id ) {
        await axios.get(process.env.SSL_IPN_URL, {
            params: {
                val_id: req.body.val_id,
                store_id: process.env.SSL_STORE,
                store_passwd: process.env.SSL_PASS,
            }
        }).then(async (response) => {
            if (response.data && (response.data.status === "VALID" || response.data.status === "VALIDATED")) {
                // @to-do update payment data here instead redirect

                return res.status(200).json('Accepted')
            } else {
                return res.status(200).json('Failed')
            }
        }).catch(() => res.status(200).json('Failed'))
    }
})

const sslPaymentRedirect = catchAsync(async (req, res) => {
    const { status } = req.query
    if (status === "failed" || status === "cancelled") {
        // Updating failed log
        const update = await PaymentModel.updateOne({ _id: req.body.value_a }, {
            others: req.body,
            status: PaymentStatus.failed
        })
        return res.redirect(`${req.body.value_c}?status=failed`)
    } else if (req.body && (req.body.status === "VALID" || req.body.status === "VALIDATED")) {
        // Updating Payment Success Log
        const update = await PaymentModel.updateOne({ _id: req.body.value_a, "user._id": req.body.value_b }, {
            transactionId: req.body.val_id,
            paidAmount: Number(req.body.store_amount),
            deductedAmount: (Number(req.body.amount) - Number(req.body.store_amount)).toFixed(2),
            others: req.body,
            status: PaymentStatus.completed
        })
        if (!update) return res.redirect(`${req.body.value_c}?status=failed`)
        const payment = await PaymentModel.findOne({ _id: req.body.value_a, "user._id": req.body.value_b });

        // @to-do create order and update product stock
        if (payment?.products?.length) {
            const productsArr = [];

            for (let i = 0; i < payment.products.length; i++) {
                const product = payment.products[i];
                if (product?.type && product.type === "lead" && product.leadId && !product?.additional?.length) {
                    await LeadModel.updateOne({ _id: product.leadId }, { isOrdered: true, status: LeadStatus.ordered });

                    const lead = await LeadModel.findOne({ _id: product.leadId }).populate("user._id", "phone").lean();

                    const newOrder = new OrderModel({
                        orderId: 1,
                        user: payment.user,
                        products: [product],
                        payment,
                        type: OrderType.lead,
                        status: OrderStatus.dispatched
                    })

                    const err = newOrder.validateSync();
                    if (err instanceof mongoose.Error) {
                        const validation = await validationError.requiredCheck(err.errors);
                        console.log(validation)
                    } else {
                        await newOrder.save();
                        // @todo if we receive payment from user via ssl {title: "Payment Received", description: "Your payment of BDT 1000 has been received by Unishopr."}
                        await addToTimeline(product.leadId, LeadTimelineType.paymentReceived)

                        const notification = {
                            userId: lead.user._id._id,
                            title: "Payment Received",
                            description: `We've received your payment.`,
                            photo: lead.photo,
                            dataId: lead.leadId,
                        };
                        await sendNotification(notification)
                    }
                } else if (product?.type && product.type === "lead" && product.leadId && product?.additional?.length) {
                    await LeadModel.updateOne({ _id: product.leadId, "checkout.additional.isPaid": false }, { "checkout.additional.$.isPaid": true })

                    const order = await OrderModel.findOne({ "products.leadId": product.leadId });
                    if (order && order?.products?.length) await OrderModel.updateOne({ _id: order._id, "products.leadId": product.leadId }, {
                        "products.$.additional": product.additional,
                        "products.$.total": order.products[0].total + product.total
                    })

                    // @todo if we receive payment from additional charges from user via ssl {title: "Payment Received", description: "Your additional payment of BDT 100 has been received by Unishopr."}
                    await addToTimeline(product.leadId, LeadTimelineType.paymentReceived)
                } else productsArr.push(product)
            }

            if (productsArr.length) {
                const newOrder = new OrderModel({
                    orderId: 1,
                    user: payment.user,
                    products: productsArr,
                    payment,
                    type: OrderType.shop,
                    status: OrderStatus.placed
                })

                const err = newOrder.validateSync();
                if (err instanceof mongoose.Error) {
                    const validation = await validationError.requiredCheck(err.errors);
                    console.log(validation)
                } else await newOrder.save();

                for (let i = 0; i < productsArr.length; i++) {
                    const product = await ProductModel.findOne({ _id: productsArr[i].productId }, { stock: true });
                    await ProductModel.updateOne({ _id: productsArr[i].productId }, { "stock.quantity": product.stock.quantity - productsArr[i].quantity })
                }
            }

            if (req.body.value_d) {
                const coupon = await CouponModel.findOne({_id: req.body.value_d})
                let discountValue = 0;
                if (update?.price && update?.amount && update.price > update.amount) discountValue = update.price - update.amount;
                if (coupon) await CouponModel.updateOne({_id: req.body.value_d}, {
                    "stats.orders": coupon?.stats?.orders ? coupon.stats.orders + 1 : 1,
                    "stats.amount": coupon?.stats?.amount ? coupon.stats.amount + discountValue : discountValue
                })
            }
        }

        return res.redirect(`${req.body.value_c}?status=success`)
    }

    return res.redirect(`${req.body.value_c}?status=failed`)
})

const manualPayment = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." });

    const {
        firstName,
        lastName,
        phone,
        address,
        products,
        couponId,
        redirectUrl,
        paymentFrom,
        amount,
        price,
        gateway,
        screenshot,
        type
    } = req.body;

    await UserModel.updateOne({ _id: user._id }, { address: [ {addressLine1: address, firstName: firstName, lastName, phone }] });

    let stockUpdated = { isUpdated: true, product: "" };
    for (let i = 0; i < products.length; i++) {
        if (products[i].type === "shop") {
            const product = await ProductModel.findOne({ _id: products[i]._id }, { stock: true, name: true });
            if (product.stock.quantity < products[i].quantity) stockUpdated = { isUpdated: false, product: product.name };
        }
    }
    if (!stockUpdated.isUpdated) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: `Not enough stock for "${stockUpdated.product}" Please remove the product from cart.` });

    const initiatePaymentRes = await initiatePayment({
        user,
        products,
        couponId,
        amount,
        price,
        gateway,
        screenshot,
        paymentFrom,
    })
    if (!initiatePaymentRes) return apiResponse(res, httpStatus.BAD_REQUEST, { message: "Couldn't initiate payment" })

    // Updating Payment Success Log
    const update = await PaymentModel.updateOne({ _id: initiatePaymentRes._id, "user._id": user._id }, {
        paidAmount: Number(amount),
        deductedAmount: 0,
        status: PaymentStatus.completed
    })

    const payment = await PaymentModel.findOne({ _id: initiatePaymentRes._id, "user._id": user._id });

    // @to-do create order and update product stock
    if (payment?.products?.length) {
        const productsArr = [];

        for (let i = 0; i < payment.products.length; i++) {
            const product = payment.products[i];
            if (product?.type && product.type === "lead" && product.leadId && !product?.additional?.length) {
                await LeadModel.updateOne({ _id: product.leadId }, { isOrdered: true, status: LeadStatus.ordered });

                const newOrder = new OrderModel({
                    orderId: 1,
                    user: payment.user,
                    products: [product],
                    payment,
                    type: OrderType.lead,
                    status: OrderStatus.placed
                })

                const err = newOrder.validateSync();
                if (err instanceof mongoose.Error) {
                    const validation = await validationError.requiredCheck(err.errors);
                    console.log(validation)
                } else await newOrder.save();
            } else if (product?.type && product.type === "lead" && product.leadId && product?.additional?.length) {
                await LeadModel.updateOne({ _id: product.leadId, "checkout.additional.isPaid": false }, { "checkout.additional.$.isPaid": true })

                const order = await OrderModel.findOne({ "products.leadId": product.leadId });
                if (order && order?.products?.length) await OrderModel.updateOne({ _id: order._id, "products.leadId": product.leadId }, {
                    "products.$.additional": product.additional,
                    "products.$.total": order.products[0].total + product.total
                })
            } else productsArr.push(product)
        }

        if (productsArr.length) {
            const newOrder = new OrderModel({
                orderId: 1,
                user: payment.user,
                products: productsArr,
                payment,
                type: OrderType.shop,
                status: OrderStatus.placed
            })

            const err = newOrder.validateSync();
            if (err instanceof mongoose.Error) {
                const validation = await validationError.requiredCheck(err.errors);
                console.log(validation)
            } else await newOrder.save();

            for (let i = 0; i < productsArr.length; i++) {
                const product = await ProductModel.findOne({ _id: productsArr[i].productId }, { stock: true });
                await ProductModel.updateOne({ _id: productsArr[i].productId }, { "stock.quantity": product.stock.quantity - productsArr[i].quantity })
            }
        }

        if (couponId) {
            const coupon = await CouponModel.findOne({_id: couponId})
            let discountValue = 0;
            if (update?.price && update?.amount && update.price > update.amount) discountValue = update.price - update.amount;
            if (coupon) await CouponModel.updateOne({_id: couponId}, {
                "stats.orders": coupon?.stats?.orders ? coupon.stats.orders + 1 : 1,
                "stats.amount": coupon?.stats?.amount ? coupon.stats.amount + discountValue : discountValue
            })
        }
    }

    return apiResponse(res, httpStatus.CREATED, { message: "Order Placed", data: initiatePaymentRes });
})

const coupon = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const { code } = req.body
    const coupon = await CouponModel.findOne({ code: code.toUpperCase(), status: CouponStatus.active });
    if (!coupon) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid coupon." })

    if (coupon?.country?._id)
        if (user?.phone?.country?._id.toString() !== coupon?.country?._id.toString())
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon is not available in this country." })

    if (coupon?.user?._id)
        if (user?._id.toString() !== coupon?.user?._id.toString())
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon is not meant for you." })

    if (coupon?.maxUsage && coupon?.stats?.orders)
        if (coupon.stats.orders >= coupon.maxUsage)
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon reached its max usage limit." })

    if (coupon?.maxAmount && coupon?.stats?.amount)
        if (coupon.stats.amount >= coupon.maxAmount)
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon reached its max amount limit." })

    if (coupon?.discount.from)
        if (new Date(coupon?.discount.from) > new Date())
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon is not available yet." })

    if (coupon?.discount.to)
        if (new Date(coupon?.discount.to) < new Date())
            return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "This coupon is expired." })

    return apiResponse(res, httpStatus.CREATED, { data: {_id: coupon._id, discount: coupon.discount, maxAmount: coupon.maxAmount}, message: "Coupon applied!" });
})


module.exports = {
    sslPayment,
    sslPaymentIpn,
    sslPaymentRedirect,
    manualPayment,
    coupon
}
