const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema, ObjectId} = mongoose;

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const discountTypes = Object.freeze({
    percentage: 'percentage',
    flat: 'flat',
    empty: null,
});

const countrySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_country' },
    name: { type: String, required: false, default: null },
    code: { type: String, required: false, default: null },
    latitude: { type: Number, required: false, default: null },
    longitude: { type: Number, required: false, default: null }
}, { _id: false });

const categorySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_category' },
    name: { type: String, required: false, default: null },
}, { _id: false });

const subCategorySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_sub_category' },
    name: { type: String, required: false, default: null },
}, { _id: false });

const childCategorySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_child_category' },
    name: { type: String, required: false, default: null },
}, { _id: false });

const tagSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_tag' },
    name: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const priceSchema = new Schema({
    cost: { type: Number, required: false, default: 0 },
    tax: { type: Number, required: false, default: 0 },
    regular: { type: Number, required: false, default: 0 },
    new: { type: Number, required: false, default: 0 },
}, { _id: false });

const discountSchema = new Schema({
    type: { type: String, enum: Object.values(discountTypes), required: false, default: null },
    value: { type: Number, required: false, default: 0 },
    from: { type: Date, required: false, default: null },
    to: { type: Date, required: false, default: null },
}, { _id: false });

const stockSchema = new Schema({
    isAlert: { type: Boolean, required: false, default: false },
    alertQty: { type: Number, required: false, default: 0 },
    quantity: { type: Number, required: false, default: 0 },
}, { _id: false });

const preOrderSchema = new Schema({
    isAllowed: { type: Boolean, required: false, default: false },
    limit: { type: Number, required: false, default: 0 },
}, { _id: false });

const gallerySchema = new Schema({
    file: { type: String, required: false, default: null },
});

const fileSchema = new Schema({
    cover: { type: String, required: false, default: null },
    featured: { type: String, required: false, default: null },
    video: { type: String, required: false, default: null },
    gallery: [{ type: gallerySchema, required: true, default: [] }]
}, { _id: false });

const factsSchema = new Schema({
    isFeatured: { type: Boolean, required: false, default: false },
    isAttributeAvailable: { type: Boolean, required: false, default: false },
}, { _id: false });

const attributeOptionSchema = new Schema({
    title: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    position: { type: Number, required: false, default: null },
    image: { type: String, required: false, default: null },
}, { timestamps: true });

const attributeSchema = new Schema({
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    isMultiple: { type: Boolean, required: false, default: false },
    maxSelection: { type: Number, required: false, default: null },
    isRequired: { type: Boolean, required: false, default: false },
    position: { type: Number, required: false, default: null },
    options: [{ type: attributeOptionSchema, required: false, default: [] }],
}, { timestamps: true });

const descriptionSchema = new Schema({
    short: { type: String, required: false, default: null },
    long: { type: String, required: false, default: null },
}, { _id: false });

const schema = new Schema({
    country: {
        type: countrySchema,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    subCategory: {
        type: subCategorySchema,
        required: false
    },
    childCategory: {
        type: childCategorySchema,
        required: false,
        default: () => ({})
    },
    tags: [{
        type: tagSchema,
        required: false,
        default: []
    }],
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
        default: null
    },
    price: {
        type: priceSchema,
        required: true
    },
    url:{
        type: String,
        required: false,
        default: null
    },
    discount: {
        type: discountSchema,
        required: false,
        default: () => ({})
    },
    stock: {
        type: stockSchema,
        required: false,
        default: () => ({})
    },
    preOrder: {
        type: preOrderSchema,
        required: false,
        default: () => ({})
    },
    file: {
        type: fileSchema,
        required: false,
        default: () => ({})
    },
    facts: {
        type: factsSchema,
        required: false,
        default: () => ({})
    },
    attributes: [{
        type: attributeSchema,
        required: false,
        default: []
    }],
    description: {
        type: descriptionSchema,
        required: false,
        default: () => ({})
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: true,
        default: status.active
    },
}, { timestamps: true });

schema.pre("save", async function (next) {
    const product = this;
    const prevProduct = await model.find().limit(1).sort({$natural:-1})

    let prevProductId = null;
    let prevSku = null;

    if (prevProduct && prevProduct.length) {
        prevProductId = prevProduct[0].productId.split('_')
        prevSku = prevProduct[0].sku.split('_')
    }

    if (product.isModified("productId")) {
        product.productId = prevProductId ? `PR_${parseInt(prevProductId[1]) + 1}` : `PR_1`;
    }

    if (product.isModified("sku")) {
        product.sku = prevSku ? `sku_${parseInt(prevSku[1]) + 1}` : `sku_1`;
    }

    next();
});

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_product", schema);
module.exports = {ProductModel: model, ProductStatus: status};
