const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const getCategories = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addCategory = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateCategory = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getSubCategories = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getSubCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addSubCategory = {
    body: Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateSubCategory = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteSubCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getChildCategories = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getChildCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addChildCategory = {
    body: Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateChildCategory = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteChildCategory = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getTags = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getTag = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addTag = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required().allow('', null),
        status: Joi.string().required(),
    })
};

const updateTag = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required().allow('', null),
        status: Joi.string().required(),
    })
};

const deleteTag = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};


const getCountries = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getCountry = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addCountry = {
    body: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        flag: Joi.string().required().allow('', null),
        currencySymbol: Joi.string().required(),
        currencyFromDollar: Joi.number().required().allow('', null),
        currencyFromBDT: Joi.number().required().allow('', null),
        status: Joi.string().required(),
    })
};

const updateCountry = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        flag: Joi.string().required().allow('', null),
        currencySymbol: Joi.string().required(),
        currencyFromDollar: Joi.number().required().allow('', null),
        currencyFromBDT: Joi.number().required().allow('', null),
        status: Joi.string().required(),
    })
};

const deleteCountry = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getCities = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getCity = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addCity = {
    body: Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        status: Joi.string().required(),
    })
};

const updateCity = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        country: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        status: Joi.string().required(),
    })
};

const deleteCity = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getLocations = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getLocation = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addLocation = {
    body: Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        code: Joi.number().required(),
        status: Joi.string().required(),
    })
};

const updateLocation = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        latitude: Joi.number().required().allow('', null),
        longitude: Joi.number().required().allow('', null),
        code: Joi.number().required(),
        status: Joi.string().required(),
    })
};

const deleteLocation = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getBanners = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getBanner = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addBanner = {
    body: Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        photo: Joi.string().required(),
        position: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateBanner = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        url: Joi.string().required(),
        photo: Joi.string().required(),
        position: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteBanner = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getBrands= {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getBrand = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addBrand= {
    body: Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        photo: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateBrand = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        url: Joi.string().required(),
        photo: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteBrand = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getLeadAttributes = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getLeadAttribute = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addLeadAttribute = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow('', null),
        country: Joi.string().allow('', null),
        value: Joi.number().allow('', null),
        type: Joi.string().allow('', null),
        status: Joi.string().required(),
    })
};

const updateLeadAttribute = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().allow('', null),
        country: Joi.string().allow('', null),
        value: Joi.number().allow('', null),
        type: Joi.string().allow('', null),
        status: Joi.string().required(),
    })
};

const deleteLeadAttribute = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const getLeadTimelines = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const getLeadTimeline = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

const addLeadTimeline = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null),
        type: Joi.string().allow('', null),
        status: Joi.string().required(),
    })
};

const updateLeadTimeline = {
    body: Joi.object({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().allow('', null),
        type: Joi.string().allow('', null),
        status: Joi.string().required(),
    })
};

const deleteLeadTimeline = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

module.exports = {
    getCategoriesValidation: validate(getCategories),
    getCategoryValidation: validate(getCategory),
    addCategoryValidation: validate(addCategory),
    updateCategoryValidation: validate(updateCategory),
    deleteCategoryValidation: validate(deleteCategory),

    getSubCategoriesValidation: validate(getSubCategories),
    getSubCategoryValidation: validate(getSubCategory),
    addSubCategoryValidation: validate(addSubCategory),
    updateSubCategoryValidation: validate(updateSubCategory),
    deleteSubCategoryValidation: validate(deleteSubCategory),

    getChildCategoriesValidation: validate(getChildCategories),
    getChildCategoryValidation: validate(getChildCategory),
    addChildCategoryValidation: validate(addChildCategory),
    updateChildCategoryValidation: validate(updateChildCategory),
    deleteChildCategoryValidation: validate(deleteChildCategory),

    getCountriesValidation: validate(getCountries),
    getCountryValidation: validate(getCountry),
    addCountryValidation: validate(addCountry),
    updateCountryValidation: validate(updateCountry),
    deleteCountryValidation: validate(deleteCountry),

    getCitiesValidation: validate(getCities),
    getCityValidation: validate(getCity),
    addCityValidation: validate(addCity),
    updateCityValidation: validate(updateCity),
    deleteCityValidation: validate(deleteCity),

    getLocationsValidation: validate(getLocations),
    getLocationValidation: validate(getLocation),
    addLocationValidation: validate(addLocation),
    updateLocationValidation: validate(updateLocation),
    deleteLocationValidation: validate(deleteLocation),

    getTagsValidation: validate(getTags),
    getTagValidation: validate(getTag),
    addTagValidation: validate(addTag),
    updateTagsValidation: validate(updateTag),
    deleteTagValidation: validate(deleteTag),

    getBannersValidation: validate(getBanners),
    getBannerValidation: validate(getBanner),
    addBannerValidation: validate(addBanner),
    updateBannerValidation: validate(updateBanner),
    deleteBannerValidation: validate(deleteBanner),

    getBrandsValidation: validate(getBrands),
    getBrandValidation: validate(getBrand),
    addBrandValidation: validate(addBrand),
    updateBrandValidation: validate(updateBrand),
    deleteBrandValidation: validate(deleteBrand),

    getLeadAttributesValidation: validate(getLeadAttributes),
    getLeadAttributeValidation: validate(getLeadAttribute),
    addLeadAttributeValidation: validate(addLeadAttribute),
    updateLeadAttributeValidation: validate(updateLeadAttribute),
    deleteLeadAttributeValidation: validate(deleteLeadAttribute),

    getLeadTimelinesValidation: validate(getLeadTimelines),
    getLeadTimelineValidation: validate(getLeadTimeline),
    addLeadTimelineValidation: validate(addLeadTimeline),
    updateLeadTimelineValidation: validate(updateLeadTimeline),
    deleteLeadTimelineValidation: validate(deleteLeadTimeline),
}
