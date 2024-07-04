const mongoose = require("mongoose");
const httpStatus = require("http-status");
const decode = require("decode-html");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const token = require("../../utils/token");
const validationError = require("../../utils/validationError");

const { ProductModel, ProductStatus } = require("../../models/feProduct.model");
const { UserModel } = require("../../models/feUser.model");
const {LeadStatus, LeadModel} = require("../../models/feLead.model");
const {PaymentModel, PaymentStatus} = require("../../models/fePayment.model");

const getProducts = catchAsync(async (req, res) => {
    const { page, perPage, sort, categoryId, subCategoryId, childCategoryId } = req.query;

    let filters = { status: ProductStatus.active }
    let productSort = { createdAt: -1 }

    if (categoryId) Object.assign(filters, { "category._id": categoryId })
    if (subCategoryId) Object.assign(filters, { "subCategory._id": subCategoryId })
    if (childCategoryId) Object.assign(filters, { "childCategory._id": childCategoryId })

    if (sort && sort === "createdAtDesc") productSort = { createdAt: -1 }
    if (sort && sort === "priceAsc") productSort = { "price.regular": 1 }
    if (sort && sort === "priceDesc") productSort = { "price.regular": -1 }

    const products = await ProductModel
        .find(filters, {
            category: true,
            subCategory: true,
            tags: true,
            name: true,
            url: true,
            productId: true,
            sku: true,
            price: true,
            discount: true,
            stock: true,
            file: true,
            description: true,
            attributes: true
        })
        .skip((perPage ? parseInt(perPage) : 10) * (parseInt(page) - 1))
        .limit(perPage ? parseInt(perPage) : 10)
        .sort(productSort);

    const total = await ProductModel.countDocuments(filters);
    const response = {
        products: products,
        page: parseInt(page),
        total,
        showing: products.length,
        hasMore: products.length === perPage
    };
    return apiResponse(res, httpStatus.OK, { data: response });
});


const getNewArrivals = catchAsync(async (req, res) => {
    const newArrivals = await ProductModel
        .find({ status: ProductStatus.active }, {
            category: true,
            subCategory: true,
            tags: true,
            name: true,
            url: true,
            productId: true,
            sku: true,
            price: true,
            discount: true,
            stock: true,
            file: true,
            description: true,
            attributes: true
        })
        .limit(10)
        .sort({ createdAt: -1 });
    return apiResponse(res, httpStatus.OK, { data: newArrivals });
});

const getBestSelling = catchAsync(async (req, res) => {
    const bestSellings = await ProductModel
        .find({ status: ProductStatus.active }, {
            category: true,
            subCategory: true,
            tags: true,
            name: true,
            productId: true,
            sku: true,
            price: true,
            url: true,
            discount: true,
            stock: true,
            file: true,
            description: true,
            attributes: true
        })
        .limit(10)
        .sort({ createdAt: 1 });
    return apiResponse(res, httpStatus.OK, { data: bestSellings });
});

const getRecentOrders = catchAsync(async (req, res) => {

    const recentOrders = await LeadModel.find({isOrdered: true}, {
        name: true,
        url: true,
        photo: true,
        price: true,
        description: true,
    })
        .limit(10)
        .sort({ createdAt: -1 })
        .lean();


    return apiResponse(res, httpStatus.OK, { data: recentOrders });
});

module.exports = { getProducts, getNewArrivals, getBestSelling, getRecentOrders }
