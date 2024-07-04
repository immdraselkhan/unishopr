const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const register = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.object({
            countryId: Joi.string().required(),
            phone: Joi.string().length(10).message("Phone must be 10 digit long").required(),
        }),
        accountType: Joi.string().required(),
    })
};

const otpVerify = {
    body: Joi.object({
        userId: Joi.string().required(),
        otp: Joi.string().length(6).required(),
        phone: Joi.object({
            countryId: Joi.string().required().allow(null).allow(""),
            phone: Joi.string().length(10).message("Phone must be 10 digit long").required().allow(null).allow(""),
        }),
    })
};

const login = {
    body: Joi.object({
        phone: Joi.string().length(10).message("Phone must be 10 digit long").required().allow(null).allow(""),
        email: Joi.string().email().required().allow(null).allow(""),
        countryId: Joi.string().required().allow(null).allow(""),
        uniAuth: Joi.string().allow(null).allow("")
    })
};

const renew = {
    body: Joi.object({
        access: Joi.string().required(),
        refresh: Joi.string().required(),
    })
};

module.exports = {
    registerValidation: validate(register),
    otpVerifyValidation: validate(otpVerify),
    loginValidation: validate(login),
    renewValidation: validate(renew),
}
