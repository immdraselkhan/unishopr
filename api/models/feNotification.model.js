const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const status = Object.freeze({
    sent: 'sent',
    seen: 'seen',
});

const userSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const schema = new Schema({
    user: {
        type: userSchema,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dataId: {
        type: String,
        required: false,
        default: null
    },
    photo: {
        type: String,
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

const model = mongoose.model("fe_notification", schema);
module.exports = {NotificationModel: model, NotificationStatus: status};
