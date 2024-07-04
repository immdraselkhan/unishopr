const httpStatus = require("http-status");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");

const {CountryModel, CountryStatus} = require("../../models/feCountry.model");
const {CategoryModel, CategoryStatus} = require("../../models/feCategory.model");
const {SubCategoryModel, SubCategoryStatus} = require("../../models/feSubCategory.model");
const {CityModel, CityStatus} = require("../../models/feCity.model");

const getCountries = catchAsync(async (req, res) => {
    const countries = await CountryModel.find({ status: { $eq: CountryStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: countries});
});

const categoryTree = catchAsync(async (req, res) => {
    const categories = await CategoryModel.find({status: CategoryStatus.active}, {label: "$name"}).lean();
    if (categories && categories.length) {
        for (let i = 0; i < categories.length; i++) {
            categories[i].path = `/products/${categories[i]._id}`;
            categories[i].columnItemItems = await SubCategoryModel.find({status: SubCategoryStatus.active, "category._id": categories[i]._id}, {label: "$name"}).lean();
            if (categories[i].columnItemItems && categories[i].columnItemItems.length) {
                for (let j = 0; j < categories[i].columnItemItems.length; j++) {
                    categories[i].columnItemItems[j].path = `/products/${categories[i]._id}/${categories[i].columnItemItems[j]._id}`
                }
            }
        }
    }

    const arr = [];
    let lastIndex = 0;
    let loopLength = parseInt(categories.length/2);
    if (categories.length % 2 !== 0) loopLength+=1;

    for (let i = 0; i < loopLength; i++) {
        let tempArr = [];
        for (let j = 0; j < 2; j++) {
            if (categories[lastIndex]) {
                tempArr.push(categories[lastIndex]);
                lastIndex++;
            }
        }
        arr.push({_id: i, columnItems: tempArr});
    }

    return apiResponse(res, httpStatus.OK, {data: arr});
})

const categoryTreeMobile = catchAsync(async (req, res) => {
    const categories = await CategoryModel.find({status: CategoryStatus.active}, {name: true}).lean();
    if (categories && categories.length) {
        for (let i = 0; i < categories.length; i++) {
            categories[i].path = `/products/${categories[i]._id}`;
            categories[i].label = categories[i].name;
            categories[i].subMenu = await SubCategoryModel.find({status: SubCategoryStatus.active, "category._id": categories[i]._id}, {name: true}).lean();
            for (let j = 0; j < categories[i].subMenu.length; j++) {
                categories[i].subMenu[j].path = `/products/${categories[i]._id}/${categories[i].subMenu[j]._id}`;
                categories[i].subMenu[j].label = categories[i].subMenu[j].name;
            }
        }
    }
    return apiResponse(res, httpStatus.OK, {data: categories});
})

const getCities = catchAsync(async (req, res) => {
    const cities = await CityModel.find({ status: { $eq: CityStatus.active } }).sort({name: 1});
    return apiResponse(res, httpStatus.OK, {data: cities});
});

module.exports = {getCountries, categoryTree, categoryTreeMobile, getCities};