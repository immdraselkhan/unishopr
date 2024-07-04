const mongoose = require("mongoose");
const {Schema} = mongoose;

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false,
        default: null
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
    flag: {
        type: String,
        required: false,
        default: null
    },
    currencySymbol: {
        type: String,
        required: false,
        default: null
    },
    currencyFromDollar: {
        type: Number,
        required: false,
        default: null
    },
    currencyFromBDT: {
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

const model = mongoose.model("fe_country", schema);
module.exports = {CountryModel: model, CountryStatus: status};
