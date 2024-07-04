const fs = require('fs');
const path = require('path');
const {PaymentStatus, PaymentModel, PaymentGateway} = require("../models/fePayment.model");
const mongoose = require("mongoose");
const validationError = require("../utils/validationError");
const {OrderModel} = require("../models/feOrder.model");

setTimeout(async () => {
    let rawData = fs.readFileSync(path.resolve(__dirname, 'payments.json'));
    let payments = JSON.parse(rawData);

    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];

        if (payment.invoiceId && payment.amount && payment.storeAmount) {
            const order = await OrderModel.findOne({"payment.invoiceNo": payment.invoiceId});
            if (order) {
                const paymentContent = {
                    user: order.user,
                    products: order.products,
                    invoiceNo: `${Math.random().toString(36).substring(7)}${+ new Date()}`,
                    amount: payment.amount,
                    price: order.payment.amount,
                    platform: "web",
                    gateway: PaymentGateway.sslcommerz,
                    status: PaymentStatus.completed,
                    transactionId: payment.tranId,
                    paidAmount: Number(payment.storeAmount),
                    deductedAmount: (Number(payment.amount) - Number(payment.storeAmount)).toFixed(2),
                    others: payment,
                    createdAt: payment.createdAt,
                    updatedAt: payment.updatedAt
                }

                const newPayment = new PaymentModel(paymentContent)

                const err = newPayment.validateSync();
                if (err instanceof mongoose.Error) {
                    const validation = await validationError.requiredCheck(err.errors);
                    console.log(validation)
                } else {
                    const thePayment =  await newPayment.save()
                    await OrderModel.updateOne({_id: order._id}, {payment: thePayment});
                    console.log("payment saved", i)
                }
            }
        }
    }

}, 1100);
