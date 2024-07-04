const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const validationError = require("../utils/validationError");
const {OrderModel} = require("../models/feOrder.model");

setTimeout(async () => {
    let rawData = fs.readFileSync(path.resolve(__dirname, 'payments.json'));
    let payments = JSON.parse(rawData);

    let count = 0;
    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];

        if (payment.invoiceId && payment.amount && payment.storeAmount) {
            const order = await OrderModel.findOne({"payment.transactionId": payment.tranId}, {_id: true});
            if (order) {
                count++;
                await OrderModel.updateOne({_id: order._id}, {"payment.invoiceNo": payment.invoiceId});
                console.log("Payment updated:", count)
            }
        }
    }

}, 1100);
