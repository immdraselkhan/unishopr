const { boolean } = require('@hapi/joi');
const Joi = require('@hapi/joi');
const { validate } = require("../../utils/validate");

// Leads

const getLeads = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getLead = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const updateLead = {
    params: Joi.object({
        _id: Joi.string().required(),
    }),
    body: Joi.object({
        _id: Joi.string().required(),
        attributes: Joi.array().optional(),
        totalAmount: Joi.number().optional(),
        status: Joi.string().optional(),
    }),
};

const updateLeadUpdate = {
    params: Joi.object({
        _id: Joi.string().required(),
    }),
    body: Joi.object({
        _id: Joi.string().optional(),
        description: Joi.string().optional(),
        title: Joi.string().required(),
    }),
};

const addLeadUpdate = {
    body: Joi.object({
        _id: Joi.string().optional(),
        description: Joi.string().optional(),
        title: Joi.string().required(),
    }),
};

// Travels

const getTravels = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getTravel = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const addTravel = {
    body: Joi.object({
        user: Joi.object({
            _id: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            photo: Joi.string().required().allow(null).allow(""),
        }).required(),
        routeFrom: Joi.string().required(),
        routeTo: Joi.string().required(),
        weightCapacity: Joi.number().required(),
        travelDate: Joi.string().required(),
    })
};

const updateTravel = {
    body: Joi.object({
        _id: Joi.string().required(),
        user: Joi.object({
            _id: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            photo: Joi.string().required().allow(null).allow(""),
        }).required(),
        routeFrom: Joi.string().required(),
        routeTo: Joi.string().required(),
        weightCapacity: Joi.number().required(),
        travelDate: Joi.string().required(),
    })
};

const deleteTravel = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const getTravelLeads = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const addTravelLeads = {
    params: Joi.object({
        _id: Joi.string().required(),
    }),
    body: Joi.object({
        travelId: Joi.string().required(),
        leadId: Joi.string().required(),
    }),
};

const resolveTravel = {
    params: Joi.object({
        _id: Joi.string().required(),
    }),
    body: Joi.object({
        _id: Joi.string().required(),
        status: Joi.string().required(),
    }),
};

const getCoupons = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getCoupon = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const addCoupon = {
    body: Joi.object({
        userId: Joi.string().allow(null).allow(""),
        name: Joi.string().required(),
        code: Joi.string().required(),
        thumbnail: Joi.string().required().allow(null).allow(""),
        country: Joi.string().required(),
        discount: Joi.object().required(),
        description: Joi.string().required(),
        maxUsage: Joi.number().required(),
        maxAmount: Joi.number().required(),
        status: Joi.string().required(),
    })
};

const updateCoupon = {
    body: Joi.object({
        _id: Joi.string().required(),
        userId: Joi.string().allow(null).allow(""),
        name: Joi.string().required(),
        code: Joi.string().required(),
        thumbnail: Joi.string().required().allow(null).allow(""),
        country: Joi.string().required(),
        discount: Joi.object().required(),
        description: Joi.string().required(),
        maxUsage: Joi.number().required(),
        maxAmount: Joi.number().required(),
        status: Joi.string().required(),
    })
};

const deleteCoupon = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

module.exports = {
    getLeadsValidation: validate(getLeads),
    getLeadValidation: validate(getLead),
    updateLeadValidation: validate(updateLead),
    addLeadUpdateValidation: validate(addLeadUpdate),
    updateLeadUpdateValidation: validate(updateLeadUpdate),

    getCouponsValidation: validate(getCoupons),
    getCouponValidation: validate(getCoupon),
    addCouponValidation: validate(addCoupon),
    updateCouponValidation: validate(updateCoupon),
    deleteCouponValidation: validate(deleteCoupon),

    getTravelsValidation: validate(getTravels),
    getTravelValidation: validate(getTravel),
    addTravelValidation: validate(addTravel),
    updateTravelValidation: validate(updateTravel),
    deleteTravelValidation: validate(deleteTravel),
    getTravelLeadsValidation: validate(getTravelLeads),
    addTravelLeadsValidation: validate(addTravelLeads),
    resolveTravelValidation: validate(resolveTravel),
}
