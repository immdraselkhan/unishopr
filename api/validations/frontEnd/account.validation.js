const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const changePhoneEmail = {
    body: Joi.object({
        phone: Joi.string().length(10).message("Phone must be 10 digit long").required().allow(null).allow(""),
        email: Joi.string().email().required().allow(null).allow(""),
        countryId: Joi.string().required().allow(null).allow(""),
        otp: Joi.string().length(6).required().allow(null).allow(""),
    })
};

module.exports = {
    changePhoneEmailValidation: validate(changePhoneEmail),
}
