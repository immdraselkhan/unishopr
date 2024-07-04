const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const discountType = Object.freeze({
    flat: 'flat',
    percentage: 'percentage',
});

const type = Object.freeze({
    individual: 'individual',
    regular: 'regular',
});

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const countrySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_country' },
    name: { type: String, required: false, default: null },
    code: { type: String, required: false, default: null },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null },
    currencySymbol: { type: String, required: false, default: null },
    currencyFromDollar: { type: Number, required: false, default: 0 },
}, { _id : false });

const userSchema = new Schema({
    _id: { type: ObjectId, required: false, default: null, ref: 'fe_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id : false });

const discountSchema = new Schema({
    type: { type: String, enum: Object.values(discountType), required: false, default: null },
    value: { type: Number, required: false, default: 0 },
    from: { type: Date, required: false, default: null },
    to: { type: Date, required: false, default: null },
}, { _id: false });

const statSchema = new Schema({
    orders: { type: Number, required: false, default: 0 },
    amount: { type: Number, required: false, default: 0 },
}, { _id : false });

const schema = new Schema({
    country: {
        type: countrySchema,
        required: false,
        default: () => ({})
    },
    user: {
        type: userSchema,
        required: false,
        default: () => ({})
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
        default: null
    },
    discount: {
        type: discountSchema,
        required: false,
        default: () => ({})
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    maxUsage: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(type),
        required: false,
        default: type.regular
    },
    stats: {
        type: statSchema,
        required: false,
        default: () => ({})
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: true,
    }
}, { timestamps: true });

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_coupon", schema);
module.exports = {CouponModel: model, CouponStatus: status};
