const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const type = Object.freeze({
    updated: 'updated',
    ongoing: 'ongoing',
    resolved: 'resolved',
    travelerAssigned: 'travelerAssigned',
    cancelled: 'cancelled',
    paymentReceived: 'paymentReceived',
    additionalCharge: 'additionalCharge',
    refunded: 'refunded',
    empty: null
});

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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

const model = mongoose.model("fe_lead_timeline", schema);
module.exports = {LeadTimelineModel: model, LeadTimelineStatus: status, LeadTimelineType: type};
