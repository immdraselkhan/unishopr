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
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
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

const model = mongoose.model("fe_brand", schema);
module.exports = {BrandModel: model, BrandStatus: status};
