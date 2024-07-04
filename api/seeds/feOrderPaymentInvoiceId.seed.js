const fs = require('fs');
const path = require('path');
const {OrderModel} = require("../models/feOrder.model");
const {PaymentModel} = require("../models/fePayment.model");

setTimeout(async () => {
    const orders = await OrderModel.find().sort({createdAt: 1});

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const payment = order?.payment?._id ? await PaymentModel.findOne({_id: order?.payment?._id}) : null;

        if (payment) await OrderModel.updateOne({_id: order._id}, {"payment.invoiceId": payment.invoiceId})
        console.log("order updated", i)
    }
}, 1100);
