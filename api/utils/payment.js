const validationError = require("./validationError");
const mongoose = require("mongoose");

const {PaymentModel, PaymentStatus, PaymentType} = require("../models/fePayment.model");

const initiatePayment = async (
    {
        user,
        products,
        couponId = null,
        gateway,
        paymentFrom = 'web',
        amount,
        price,
        screenshot = null
    }
) => {
    const data = {
        user,
        products,
        couponId: couponId ? couponId : null,
        invoiceNo: `${Math.random().toString(36).substring(7)}${+ new Date()}`,
        invoiceId: 'INV_1',
        amount,
        price,
        platform: paymentFrom,
        gateway,
        screenshot,
        status: PaymentStatus.initiated
    }

    // Save initial data to payment
    const newPayment = new PaymentModel(data)

    const err = newPayment.validateSync();
    if (err instanceof mongoose.Error) {
        return await validationError.requiredCheck(err.errors);
    }
    return await newPayment.save()
}

module.exports = {initiatePayment}
