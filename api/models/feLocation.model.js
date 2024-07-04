const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

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
    longitude: { type: Number, required: false, default: null }
}, { _id: false });

const citySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_city' },
    name: { type: String, required: false, default: null },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null }
}, { _id: false });

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: countrySchema,
        required: true
    },
    city: {
        type: citySchema,
        required: true
    },
    latitude: {
        type: Number,
        required: false,
        default: null
    },
    longitude: {
        type: Number,
        required: false,
        default: null
    },
    code: {
        type: Number,
        required: false,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: true
    }
}, { timestamps: true });

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_location", schema);
module.exports = {LocationModel: model, LocationStatus: status};
