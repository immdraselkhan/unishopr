const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const platform = Object.freeze({
    web: 'web',
    android: 'android',
    ios: 'ios',
});

const types = Object.freeze({
    cash: 'cash',
    online: 'online'
});

const gateway = Object.freeze({
    sslcommerz: 'sslcommerz',
    bKash: 'bKash',
    banking: 'banking',
});

const status = Object.freeze({
    initiated: 'initiated',
    failed: 'failed',
    completed: 'completed',
    refunded: 'refunded',
});

const productTypes = Object.freeze({
    lead: 'lead',
    shop: 'shop',
});

const userSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const productExtraSchema = new Schema({
    name: { type: String, required: false, default: null },
    value: { type: Number, required: false, default: null },
}, { _id : false });

const productAttributeSchema = new Schema({
    attribute: { type: String, required: false, default: null },
    option: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
}, { _id: false });

const productSchema = new Schema({
    _id: { type: ObjectId, required: false, default: null },
    productId: { type: ObjectId, required: false, default: null, ref: "fe_product" },
    leadId: { type: ObjectId, required: false, default: null, ref: "fe_lead" },
    type: { type: String, enum: Object.values(productTypes), required: false, default: productTypes.shop },
    name: { type: String, required: false, default: null },
    thumbnail: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    quantity: { type: Number, required: false, default: null },
    total: { type: Number, required: false, default: null },
    extra: [{ type: productExtraSchema, required: false, default: [] }],
    additional: [{ type: productExtraSchema, required: false, default: [] }],
    attributes: [{type: productAttributeSchema, required: false, default: []}]
}, { _id : false });

const schema = new Schema({
    user: {
        type: userSchema,
        required: false,
        default: () => ({})
    },
    products: [{
        type: productSchema,
        required: false,
        default: []
    }],
    invoiceNo: {
        type: String,
        required: true,
        unique: true
    },
    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    transactionId: {
        type: String,
        required: false,
        default: null
    },
    currency: {
        type: String,
        required: false,
        default: "BDT"
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: false,
        default: null
    },
    deductedAmount: {
        type: Number,
        required: false,
        default: null
    },
    couponId: {
        type: ObjectId,
        required: false,
        ref: "fe_coupon",
        default: null
    },
    platform: {
        type: String,
        enum: Object.values(platform),
        default: null
    },
    gateway: {
        type: String,
        enum: Object.values(gateway),
        default: null
    },
    screenshot: {
        type: String,
        required: false,
        default: null
    },
    others: {
        type: Object,
        default: null
    },
    type: {
        type: String,
        enum: Object.values(types),
        required: false,
        default: types.online
    },
    status: {
        type: String,
        enum: Object.values(status),
    }
}, { timestamps: true });

schema.pre("save", async function (next) {
    const payment = this;
    const prevPayment = await model.find().limit(1).sort({$natural:-1})

    let prevInvoiceId = null;
    if (prevPayment && prevPayment.length) prevInvoiceId = prevPayment[0].invoiceId.split('_');
    if (payment.isModified("invoiceId")) payment.invoiceId = prevInvoiceId ? `INV_${parseInt(prevInvoiceId[1]) + 1}` : `INV_1`;

    next();
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_payment", schema);

module.exports = {
    PaymentModel: model,
    PaymentStatus: status,
    PaymentGateway: gateway,
    PaymentPlatform: platform
};
