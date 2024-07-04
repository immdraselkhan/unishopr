const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;
const {PaymentStatus, PaymentGateway, PaymentPlatform} = require("./fePayment.model");

const types = Object.freeze({
    lead: 'lead',
    shop: 'shop',
});

const status = Object.freeze({
    placed: 'placed',
    confirmed: 'confirmed',
    dispatched: 'dispatched',
    delivered: 'delivered',
    cancelled: 'cancelled',
});

const paymentTypes = Object.freeze({
    cash: 'cash',
    online: 'online',
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
    type: { type: String, enum: Object.values(types), required: false, default: types.shop },
    name: { type: String, required: false, default: null },
    thumbnail: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    quantity: { type: Number, required: false, default: null },
    total: { type: Number, required: false, default: null },
    extra: [{ type: productExtraSchema, required: false, default: [] }],
    additional: [{ type: productExtraSchema, required: false, default: [] }],
    attributes: [{type: productAttributeSchema, required: false, default: []}]
}, { _id : false });

const paymentSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_payment', default: null },
    invoiceNo: { type: String, required: false, default: null },
    invoiceId: { type: String, required: false, default: null },
    transactionId: { type: String, required: false, default: null },
    amount: { type: Number, required: false, default: null },
    currency: { type: String, required: false, default: "BDT" },
    paidAmount: { type: Number, required: false, default: null },
    deductedAmount: { type: Number, required: false, default: null },
    platform: { type: String, enum: Object.values(PaymentPlatform), default: PaymentPlatform.web },
    gateway: { type: String, enum: Object.values(PaymentGateway), default: PaymentGateway.cashManual },
    others: { type: Object, default: null },
    status: { type: String, enum: Object.values(PaymentStatus), required: false, default: PaymentStatus.initiated, },
    type: { type: String, enum: Object.values(paymentTypes), required: false, default: paymentTypes.online, },
}, { _id: false });

const schema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: userSchema,
        required: false,
        default: () => ({})
    },
    products: [{
        type: productSchema,
        required: true,
        default: []
    }],
    payment: {
        type: paymentSchema,
        required: true,
        default: () => ({})
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(types),
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: status.placed
    }
}, { timestamps: true });

schema.pre("save", async function (next) {
    const order = this;
    const prevOrder = await model.find().limit(1).sort({$natural:-1})
    let prevOrderId = null;

    if (prevOrder && prevOrder.length && prevOrder[0].orderId) {
        prevOrderId = prevOrder[0].orderId.split('_')
    }
    if (order.isModified("orderId")) {
        order.orderId = prevOrderId ? `ODR_${parseInt(prevOrderId[1]) + 1}` : `ODR_1`;
    }

    next();
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_order", schema);
module.exports = { OrderModel: model, OrderType: types, OrderStatus: status };
