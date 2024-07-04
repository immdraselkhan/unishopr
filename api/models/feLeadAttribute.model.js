const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const type = Object.freeze({
    percentage: 'percentage',
    flat: 'flat',
    empty: null
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
    longitude: { type: Number, required: false, default: null }
},{ _id: false });

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: countrySchema,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    value: {
        type: Number,
        required: false,
        default: null
    },
    type: {
        type: String,
        enum: Object.values(type),
        required: false,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: true,
    },
}, { timestamps: true });

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_lead_attribute", schema);
module.exports = {LeadAttributeModel: model, LeadAttributeStatus: status};
