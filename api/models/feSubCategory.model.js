const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const categorySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_category' },
    name: { type: String, required: false, default: null },
}, { _id: false });

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    description: {
        type: String,
        required: true,
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

const model = mongoose.model("fe_sub_category", schema);
module.exports = {SubCategoryModel: model, SubCategoryStatus: status};
