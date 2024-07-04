const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;
const bcrypt = require("bcrypt");

const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const servicesStatus = Object.freeze({
    requested: 'requested',
    rejected: 'rejected',
    approved: 'approved',
    null: null,
});

const gender = Object.freeze({
    male: 'male',
    female: 'female',
    other: 'other',
    empty: null,
});

const accountType = Object.freeze({
    phone: 'phone',
    facebook: 'facebook',
    google: 'google',
});

const countrySchema = new Schema({
    _id: { type: ObjectId, required: true, ref: 'fe_country' },
    name: { type: String, required: true },
    code: { type: String, required: true },
}, { _id : false });

const citySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_city' },
    name: { type: String, required: false, default: null },
},{ _id: false });

const locationSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'fe_location' },
    name: { type: String, required: false, default: null },
    code: { type: Number, required: false, default: null },
},{ _id: false });

const phoneSchema = new Schema({
    phone: { type: String, required: false, default: null },
    country: { type: countrySchema, required: true, default: () => ({}) },
}, { _id : false });

const otpSchema = new Schema({
    otp: { type: String, required: false, default: null },
    verified: { type: Boolean, required: false, default: false }
}, { _id : false });

const verifiedBySchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'be_user' },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null }
}, { _id : false });

const verificationSchema = new Schema({
    verified: { type: Boolean, required: false, default: false },
    verifiedAt: { type: Date, required: false, default: null },
    verifiedBy: { type: verifiedBySchema, required: false, default: null },
}, { _id : false });

const addressSchema = new Schema([{
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    country: { type: countrySchema, required: false, default: () => ({}) },
    city: { type: citySchema, required: false, default: () => ({}) },
    location: { type: locationSchema, required: false, default: () => ({}) },
    addressLine1: { type: String, required: false, default: null },
    addressLine2: { type: String, required: false, default: null },
},{ _id: false }]);

const socialSchema = new Schema({
    facebook: { type: String, required: false, default: null },
    linkedin: { type: String, required: false, default: null },
    instagram: { type: String, required: false, default: null },
    twitter: { type: String, required: false, default: null },
}, { _id : false });

const travelerSchema = new Schema({
    isTraveler: { type: Boolean, required: false, default: false },
    overview: { type: String, required: false, default: null },
    status: { type: String, enum: Object.values(servicesStatus), required: false, default: null }
}, { _id : false });

const partnerSchema = new Schema({
    isPartner: { type: Boolean, required: false, default: false },
    overview: { type: String, required: false, default: null },
    status: { type: String, enum: Object.values(servicesStatus), required: false, default: null }
}, { _id : false });

const servicesSchema = new Schema({
    traveler: { type: travelerSchema, required: false, default: () => ({}) },
    partner: { type: partnerSchema, required: false, default: () => ({}) },
}, { _id : false });

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/],
    },
    phone: {
        type: phoneSchema,
        required: false,
        default: () => ({})
    },
    otp: {
        type: otpSchema,
        required: false,
        default: () => ({})
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    verification: {
        type: verificationSchema,
        required: false,
        default: () => ({})
    },
    gender: {
        type: String,
        enum: Object.values(gender),
        required: false,
        default: gender.empty
    },
    photo: {
        type: String,
        required: false,
        default: null
    },
    overview: {
        type: String,
        required: false,
        default: null
    },
    address: [{
        type: addressSchema,
        required: false,
        default: []
    }],
    social: {
        type: socialSchema,
        required: false,
        default: () => ({})
    },
    services: {
        type: servicesSchema,
        required: false,
        default: () => ({})
    },
    accountType: {
        type: String,
        enum: Object.values(accountType),
        required: false,
        default: accountType.phone
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: false,
        default: status.active
    }
}, { timestamps: true });

schema.statics.isUnique = async function (email, phone) {
    let user = null;
    if (phone.phone) user = await this.findOne({$or: [{email}, {"phone.phone": phone.phone}]}, {_id: true, email: true, phone: true});
    else user = await this.findOne({email}, {_id: true});

    if (!user) {
        return true;
    } else if (user.email === email) {
        return {email};
    } else if (phone.phone && user.phone.phone === phone.phone.toString()) {
        return {phone: phone.phone};
    }
    return true;
};

schema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

schema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.password;
    delete obj.status;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("fe_user", schema);
module.exports = {UserModel: model, UserGender: gender, UserStatus: status, UserServicesStatus: servicesStatus};
