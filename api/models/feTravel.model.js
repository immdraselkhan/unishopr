const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const status = Object.freeze({
    upcoming: 'upcoming',
    resolved: 'resolved',
    completed: 'completed',
});

const userSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const weightSchema = new Schema({
    capacity: { type: Number, required: false, default: 0 },
    loaded: { type: Number, required: false, default: 0 },
    remaining: { type: Number, required: false, default: 0 },
}, { _id: false });

const countrySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_country' },
    name: { type: String, required: false, default: null },
    code: { type: String, required: false, default: null },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null },
    flag: { type: String, required: false, default: null },
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
    value: { type: Number, required: false, default: 0 },
}, { timestamps: true });

const checkoutSchema = new Schema({
    attributes: [{ type: checkoutAttributeSchema, required: false, default: [] }],
    totalAmount: { type: Number, required: false, default: 0 },
}, { _id: false });

const leadSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_lead' },
    user: { type: userSchema, required: true, default: () => ({}) },
    leadId: { type: String, required: true, default: null },
    url: { type: String, required: false, default: null },
    name: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    quantity: { type: Number, required: false, default: null },
    weight: { type: Number, required: false, default: null },
    isBoxNeeded: { type: Boolean, required: false, default: false },
    route: { type: routeSchema, required: false, default: () => ({}) },
    description: { type: String, required: false, default: null },
    checkout: { type: checkoutSchema, required: false, default: () => ({}), },
}, { _id: false });

const schema = new Schema({
    user: {
        type: userSchema,
        required: true,
    },
    travelId: {
        type: String,
        required: true,
    },
    travelDate: {
        type: Date,
        required: true,
    },
    weight: {
        type: weightSchema,
        required: false,
        default: () => ({})
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
    leads: [{
        type: leadSchema,
        required: false,
        default: []
    }],
    status: {
        type: String,
        enum: Object.values(status),
        required: false,
        default: status.upcoming
    }
}, { timestamps: true });

schema.pre("save", async function (next) {
    const travel = this;
    const prevTravel = await model.find().limit(1).sort({$natural:-1})

    let prevTravelId = null;

    if (prevTravel && prevTravel.length) prevTravelId = prevTravel[0].travelId.split('_')
    if (travel.isModified("travelId")) travel.travelId = prevTravelId ? `TV_${parseInt(prevTravelId[1]) + 1}` : `TV_1`;

    next();
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_travel", schema);
module.exports = {TravelModel: model, TravelStatus: status};
