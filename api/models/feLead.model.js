const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const status = Object.freeze({
    pending: 'pending',
    ongoing: 'ongoing',
    resolved: 'resolved',
    checkout: 'checkout',
    ordered: 'ordered',
    // delivered: 'delivered',
    cancelled: 'cancelled',
    deleted: 'deleted',
});

const userSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const countrySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_country' },
    name: { type: String, required: false, default: null },
    code: { type: String, required: false, default: null },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null },
    flag: { type: String, required: false, default: null },
    currencySymbol: { type: String, required: false, default: null },
    currencyFromDollar: { type: Number, required: false, default: null },
}, { _id: false });

const citySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_city' },
    name: { type: String, required: false, default: null },
    country: { type: countrySchema, required: false, default: () => ({}) },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null },
}, { _id: false });

const routeSchema = new Schema({
    from: { type: citySchema, required: false, default: () => ({}) },
    to: { type: citySchema, required: false, default: () => ({}) },
}, { _id: false });

const checkoutAttributeSchema = new Schema({
    name: { type: String, required: false, default: null },
    cost: { type: Number, required: false, default: 0 },
    value: { type: Number, required: false, default: 0 },
}, { timestamps: true });

const checkoutAdditionalSchema = new Schema({
    title: { type: String, required: false, default: null },
    attributes: [{ type: checkoutAttributeSchema, required: false, default: [] }],
    isPaid: { type: Boolean, required: false, default: false },
}, { timestamps: true });

const checkoutSchema = new Schema({
    attributes: [{ type: checkoutAttributeSchema, required: false, default: [] }],
    additional: [{ type: checkoutAdditionalSchema, required: false, default: [] }],
    totalAmount: { type: Number, required: false, default: 0 },
    totalCost: { type: Number, required: false, default: 0 },
    totalProfit: { type: Number, required: false, default: 0 },
}, { _id: false });

const createdBySchema = new Schema({
    firstName: { type: String, required: true, default: null },
    lastName: { type: String, required: true, default: null },
    photo: { type: String, required: true, default: null }
}, { _id : false });

const updateSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_lead_timeline' },
    title: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    createdBy: { type: createdBySchema, required: false, default: () => ({}) }
}, { timestamps: true });

const travelSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_travel' },
    user: { type: userSchema, required: false, default: () => ({}) },
    travelId: { type: String, required: false, default: null },
    travelDate: { type: Date, required: false, default: null },
    route: { type: routeSchema, required: false, default: () => ({}) },
    description: { type: String, required: false, default: null },
}, { _id: false });

const schema = new Schema({
    user: {
        type: userSchema,
        required: true,
    },
    travel: {
        type: travelSchema,
        required: false,
        default: () => ({})
    },
    leadId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: null
    },
    photo: {
        type: String,
        required: false,
        default: null
    },
    currency: {
        type: String,
        required: false,
        default: null
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    foreignCurrency: {
        type: String,
        required: false,
        default: null
    },
    foreignPrice: {
        type: Number,
        required: false,
        default: 0
    },
    cost: {
        type: Number,
        required: false,
        default: 0
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    },
    weight: {
        type: Number,
        required: false,
        default: 0
    },
    isBoxNeeded: {
        type: Boolean,
        required: false,
        default: false
    },
    isUrgent: {
        type: Boolean,
        required: false,
        default: false
    },
    route: {
        type: routeSchema,
        required: false,
        default: () => ({})
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    checkout: {
        type: checkoutSchema,
        required: false,
        default: () => ({}),
    },
    isOrdered: {
        type: Boolean,
        required: false,
        default: false
    },
    updates: [{
        type: updateSchema,
        required: false,
        default: []
    }],
    status: {
        type: String,
        enum: Object.values(status),
        required: false,
        default: status.pending
    }
}, { timestamps: true });

schema.pre("save", async function (next) {
    const lead = this;
    const prevLead = await model.find().limit(1).sort({$natural:-1})

    let prevLeadId = null;

    if (prevLead && prevLead.length) prevLeadId = prevLead[0].leadId.split('_')
    if (lead.isModified("leadId")) lead.leadId = prevLeadId ? `LD_${parseInt(prevLeadId[1]) + 1}` : `LD_1`;

    next();
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_lead", schema);
module.exports = {LeadModel: model, LeadStatus: status};
