const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const addUser  = {
    body : Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.object({
            phone: Joi.string().length(10).message("Phone must be 10 digit long").required(),
            country: Joi.object({
                _id: Joi.string().required(),
                code: Joi.string().required(),
                name: Joi.string().required()
            }).required(),
        }).required(),
        gender: Joi.string().required(),
    })
}

const updateUser = {
    body : Joi.object({
        _id: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.object({
            phone: Joi.string().length(10).message("Phone must be 10 digit long").required(),
            country: Joi.object({
                _id: Joi.string().required(),
                code: Joi.string().required(),
                name: Joi.string().required()
            }).required(),
        }).required(),
        gender: Joi.string(),
    })
}

const getUsers = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getUser = {
    params: Joi.object({
        _id: Joi.string().required()
    })
}

const getTravelers = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};


const travelerRequest = {
    body: Joi.object({
        _id: Joi.string().required(),
        overview: Joi.string().required(),
    })
};

const updateTraveler = {
    body: Joi.object({
        _id: Joi.string().required(),
        overview: Joi.string().required(),
    })
}

const travelersApprove = {
    body: Joi.object({
        travelerId: Joi.string().required(),
    })
};


module.exports = {
    addUserValidation: validate(addUser),
    updateUserValidation: validate(updateUser),
    getUsersValidation: validate(getUsers),
    getUserValidation: validate(getUser),
    getTravelersValidation: validate(getTravelers),
    travelerRequestValidation: validate(travelerRequest),
    updateTravelerValidation: validate(updateTraveler),
    travelersApproveValidation: validate(travelersApprove),
}
