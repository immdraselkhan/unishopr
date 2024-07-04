const httpStatus = require("http-status");
const mongoose = require("mongoose");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");

const {CategoryModel, CategoryStatus} = require("../../models/feCategory.model")
const {SubCategoryModel, SubCategoryStatus} = require("../../models/feSubCategory.model")
const {ChildCategoryModel, ChildCategoryStatus} = require("../../models/feChildCategory.model")
const {CountryModel, CountryStatus} = require("../../models/feCountry.model");
const {CityModel, CityStatus} = require("../../models/feCity.model");
const {LocationModel, LocationStatus} = require("../../models/feLocation.model");
const {TagModel, TagStatus} = require("../../models/feTag.model");
const {BannerModel, BannerStatus} = require("../../models/feBanner.model");
const {BrandModel, BrandStatus} = require("../../models/feBrands.model");
const {LeadAttributeModel, LeadAttributeStatus} = require("../../models/feLeadAttribute.model");
const {LeadTimelineModel, LeadTimelineStatus} = require("../../models/feLeadTimeline.model");


const addCategory = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    const newCategory = new CategoryModel({name, status, description});

    const err = newCategory.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newCategory.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Category Created"});
});

const updateCategory = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    await CategoryModel.updateOne({_id: req.params.id}, {$set: {name, status, description}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getCategories = catchAsync(async (req, res) => {
    const categories = await CategoryModel
        .find({status: {$ne: CategoryStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await CategoryModel.countDocuments({status: {$ne: CategoryStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: categories};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getCategory = catchAsync(async (req, res) => {
    const {id} = req.params;
    const categoryInfo = await CategoryModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: categoryInfo})
});

const deleteCategory = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live courses involved

    await CategoryModel.updateOne({_id: req.params.id}, {$set: {status: CategoryStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

// Sub Category
const addSubCategory = catchAsync(async (req, res) => {
    const {name, description, status} = req.body;
    const category = await CategoryModel.findOne({_id: req.body.category}, {name: true})
    const newSubCategory = new SubCategoryModel({name, category, description, status});

    const err = newSubCategory.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }
    const save = await newSubCategory.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Created"});
});

const updateSubCategory = catchAsync(async (req, res) => {
    const {name, description, status} = req.body;
    const category = await CategoryModel.findOne({_id: req.body.category}, {name: true})
    await SubCategoryModel.updateOne({_id: req.params.id}, {name, category, description, status});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getSubCategories = catchAsync(async (req, res) => {
    const subCategories = await SubCategoryModel
        .find({status: {$ne: SubCategoryStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await SubCategoryModel.countDocuments({status: {$ne: SubCategoryStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: subCategories};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getSubCategory = catchAsync(async (req, res) => {
    const {id} = req.params;
    const subCategoryInfo = await SubCategoryModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: subCategoryInfo})
});

const deleteSubCategory = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live sub category involved

    await SubCategoryModel.updateOne({_id: req.params.id}, {$set: {status: SubCategoryStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: SubCategoryStatus.deleted});
});

// Child Category
const addChildCategory = catchAsync(async (req, res) => {
    const {name, description, status} = req.body;
    const category = await CategoryModel.findOne({_id: req.body.category}, {name: true})
    const subCategory = await SubCategoryModel.findOne({_id: req.body.subCategory}, {name: true})
    const newChildCategory = new ChildCategoryModel({name, category, subCategory, description, status});

    const err = newChildCategory.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }
    const save = await newChildCategory.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Created"});
});

const updateChildCategory = catchAsync(async (req, res) => {
    const {name, description, status} = req.body;
    const category = await CategoryModel.findOne({_id: req.body.category}, {name: true})
    const subCategory = await SubCategoryModel.findOne({_id: req.body.subCategory}, {name: true})
    await ChildCategoryModel.updateOne({_id: req.params.id}, {name, category, subCategory, description, status});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getChildCategories = catchAsync(async (req, res) => {
    const childCategories = await ChildCategoryModel
        .find({status: {$ne: ChildCategoryStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await ChildCategoryModel.countDocuments({status: {$ne: ChildCategoryStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: childCategories};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getChildCategory = catchAsync(async (req, res) => {
    const {id} = req.params;
    const childCategoryInfo = await ChildCategoryModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: childCategoryInfo})
});

const deleteChildCategory = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live sub category involved

    await ChildCategoryModel.updateOne({_id: req.params.id}, {$set: {status: ChildCategoryStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: ChildCategoryStatus.deleted});
});

// Country
const addCountry = catchAsync(async (req, res) => {
    const newCountry = new CountryModel(req.body);

    const err = newCountry.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newCountry.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Country Created"});
});

const updateCountry = catchAsync(async (req, res) => {
    const {name, code, latitude, longitude, flag, currencySymbol, currencyFromDollar, currencyFromBDT, status} = req.body;
    await CountryModel.updateOne({_id: req.params.id}, {
        name,
        code,
        latitude,
        longitude,
        flag,
        currencySymbol,
        currencyFromDollar,
        currencyFromBDT,
        status
    });
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated."});
});

const getCountries = catchAsync(async (req, res) => {
    const countries = await CountryModel
        .find({status: {$ne: CountryStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await CountryModel.countDocuments({status: {$ne: CountryStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: countries};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getCountry = catchAsync(async (req, res) => {
    const {id} = req.params;
    const countryInfo = await CountryModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: countryInfo})
});

const deleteCountry = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live country involved

    await CountryModel.updateOne({_id: req.params.id}, {$set: {status: CountryStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

// City
const addCity = catchAsync(async (req, res) => {
    const {name, latitude, longitude, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true
    })
    const newCity = new CityModel({name, country, latitude, longitude, status});

    const err = newCity.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }
    const save = await newCity.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "City Created"});
});

const updateCity = catchAsync(async (req, res) => {
    const {name, latitude, longitude, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true
    })
    await CityModel.updateOne({_id: req.params.id}, {name, country, latitude, longitude, status});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated."});
});

const getCities = catchAsync(async (req, res) => {
    const cities = await CityModel
        .find({status: {$ne: CityStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await CityModel.countDocuments({status: {$ne: CityStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: cities};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getCity = catchAsync(async (req, res) => {
    const {id} = req.params;
    const cityInfo = await CityModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: cityInfo})
});

const deleteCity = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live city involved

    await CityModel.updateOne({_id: req.params.id}, {$set: {status: CityStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: CityStatus.deleted});
});

// Locations
const addLocation = catchAsync(async (req, res) => {
    const {name, latitude, longitude, code, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true
    })
    const city = await CityModel.findOne({_id: req.body.city}, {
        name: true, latitude: true, longitude: true
    })

    const newLocation = new LocationModel({name, country, city, latitude, longitude, code, status});

    const err = newLocation.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }
    const save = await newLocation.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Location Created"});
});

const updateLocation = catchAsync(async (req, res) => {
    const {name, latitude, longitude, code, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true
    })
    const city = await CityModel.findOne({_id: req.body.city}, {
        name: true, latitude: true, longitude: true
    })

    await LocationModel.updateOne({_id: req.params.id}, {name, country, city, latitude, longitude, code, status});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated."});
});

const getLocations = catchAsync(async (req, res) => {
    const locations = await LocationModel
        .find({status: {$ne: LocationStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await LocationModel.countDocuments({status: {$ne: LocationStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: locations};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getLocation = catchAsync(async (req, res) => {
    const {id} = req.params;
    const locationInfo = await LocationModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: locationInfo})
});

const deleteLocation = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live location involved

    await LocationModel.updateOne({_id: req.params.id}, {$set: {status: LocationStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

// Tags
const addTag = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    const newTag = new TagModel({name, status, description});

    const err = newTag.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newTag.save();
    if (!save) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Tag Created"});
});

const updateTag = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    await TagModel.updateOne({_id: req.params.id}, {
        $set: {name, status, description}
    });
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getTags = catchAsync(async (req, res) => {
    const tags = await TagModel
        .find({status: {$ne: TagStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await TagModel.countDocuments({status: {$ne: TagStatus.deleted}});
    const response = {page: req.query.page, perPage: req.query.perPage, total, data: tags};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getTag = catchAsync(async (req, res) => {
    const {id} = req.params;
    const tagInfo = await TagModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: tagInfo})
});

const deleteTag = catchAsync(async (req, res) => {
    const {id} = req.params;

    const deleteTag = await TagModel.updateOne({_id: id}, {$set: {status: TagStatus.deleted}});
    if (!deleteTag) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

// Banners
const addBanner = catchAsync(async (req, res) => {
    const {name, url, status, position, description, photo} = req.body;
    const newBanner = new BannerModel({name, url, status, position, photo, description});

    const err = newBanner.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newBanner.save();
    if (!save) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Banner Created"});
});

const updateBanner = catchAsync(async (req, res) => {
    const {name, url, status, position, description, photo} = req.body;
    await BannerModel.updateOne({_id: req.params.id}, {
        $set: {name, url, status, position, description, photo}
    });
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getBanners = catchAsync(async (req, res) => {
    const banners = await BannerModel
        .find({status: {$ne: BannerStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({position: 1});

    const total = await BannerModel.countDocuments({status: {$ne: BannerStatus.deleted}});
    const response = {page: req.query.page, perPage: req.query.perPage, total, data: banners};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getBanner = catchAsync(async (req, res) => {
    const {id} = req.params;
    const bannerInfo = await BannerModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: bannerInfo})
});

const deleteBanner = catchAsync(async (req, res) => {
    const {id} = req.params;

    const deleteBanner = await BannerModel.updateOne({_id: id}, {$set: {status: BannerStatus.deleted}});
    if (!deleteBanner) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

//Brands
const addBrand = catchAsync(async (req, res) => {
    const {name, photo, url, status, description} = req.body;
    const newBrand = new BrandModel({name, url, photo, status, description});

    const err = newBrand.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newBrand.save();
    if (!save) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Brand Created"});
});

const updateBrand = catchAsync(async (req, res) => {
    const {name, url, photo, status, description} = req.body;
    await BrandModel.updateOne({_id: req.params.id}, {
        $set: {name, photo, url, status, description}
    });
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getBrands = catchAsync(async (req, res) => {
    const brands = await BrandModel
        .find({status: {$ne: BrandStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await BrandModel.countDocuments({status: {$ne: BrandStatus.deleted}});
    const response = {page: req.query.page, perPage: req.query.perPage, total, data: brands};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getBrand = catchAsync(async (req, res) => {
    const {id} = req.params;
    const brandInfo = await BrandModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: brandInfo})
});

const deleteBrand = catchAsync(async (req, res) => {
    const {id} = req.params;

    const deleteBrand = await BrandModel.updateOne({_id: id}, {$set: {status: BrandStatus.deleted}});
    if (!deleteBrand) return apiResponse(res, httpStatus.BAD_REQUEST);
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});


const addLeadAttribute = catchAsync(async (req, res) => {
    const {name, description, type, value, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true, currency: true
    })
    const newLeadAttribute = new LeadAttributeModel({name, status, country, description, type, value});

    const err = newLeadAttribute.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newLeadAttribute.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "LeadAttribute Created"});
});

const updateLeadAttribute = catchAsync(async (req, res) => {
    const {name, description, type, value, status} = req.body;
    const country = await CountryModel.findOne({_id: req.body.country}, {
        name: true, code: true, latitude: true, longitude: true
    })
    await LeadAttributeModel.updateOne({_id: req.params.id}, {$set: {name, description, country, type, value, status}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getLeadAttributes = catchAsync(async (req, res) => {
    const categories = await LeadAttributeModel
        .find({status: {$ne: LeadAttributeStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await LeadAttributeModel.countDocuments({status: {$ne: LeadAttributeStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: categories};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getLeadAttribute = catchAsync(async (req, res) => {
    const {id} = req.params;
    const categoryInfo = await LeadAttributeModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: categoryInfo})
});

const deleteLeadAttribute = catchAsync(async (req, res) => {
    // @to-do can't be deleted if live courses involved

    await LeadAttributeModel.updateOne({_id: req.params.id}, {$set: {status: LeadAttributeStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

// Lead Timeline

const addLeadTimeline = catchAsync(async (req, res) => {
    const {title, description, type, status} = req.body;
    
    const newLeadTimeline = new LeadTimelineModel({title, description, type, status});

    const err = newLeadTimeline.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, {message: "Validation Required"}, validation);
    }

    const save = await newLeadTimeline.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "LeadTimeline Created"});
});

const updateLeadTimeline = catchAsync(async (req, res) => {
    const {title, description, type, status} = req.body;
    
    await LeadTimelineModel.updateOne({_id: req.params.id}, {$set: {title, description, type, status}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getLeadTimelines = catchAsync(async (req, res) => {
    const categories = await LeadTimelineModel
        .find({status: {$ne: LeadTimelineStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await LeadTimelineModel.countDocuments({status: {$ne: LeadTimelineStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: categories};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getLeadTimeline = catchAsync(async (req, res) => {
    const {id} = req.params;
    const categoryInfo = await LeadTimelineModel.findOne({_id: id});
    return apiResponse(res, httpStatus.OK, {data: categoryInfo})
});

const deleteLeadTimeline = catchAsync(async (req, res) => {
    await LeadTimelineModel.updateOne({_id: req.params.id}, {$set: {status: LeadTimelineStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});

module.exports = {
    addCategory, getCategories, getCategory, deleteCategory, updateCategory,
    addSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory,
    addChildCategory, getChildCategories, getChildCategory, deleteChildCategory, updateChildCategory,
    addTag, getTags, getTag, deleteTag, updateTag,
    addCountry, getCountries, getCountry, updateCountry, deleteCountry,
    addCity, getCities, getCity, updateCity, deleteCity,
    addLocation, getLocations, getLocation, updateLocation, deleteLocation,
    addBanner, getBanners, getBanner, updateBanner, deleteBanner,
    addBrand, getBrands, getBrand, updateBrand, deleteBrand,
    addLeadAttribute, updateLeadAttribute, getLeadAttributes, getLeadAttribute, deleteLeadAttribute,
    addLeadTimeline, updateLeadTimeline, getLeadTimelines, getLeadTimeline, deleteLeadTimeline,
};
