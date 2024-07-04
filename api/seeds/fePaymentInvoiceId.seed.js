const fs = require('fs');
const path = require('path');
const {PaymentModel} = require("../models/fePayment.model");

setTimeout(async () => {
    const payments = await PaymentModel.find().sort({createdAt: 1});

    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];
        await PaymentModel.updateOne({_id: payment._id}, {invoiceId: `INV_${i+1}`})
        console.log("payment updated", i)
    }
}, 1100);
