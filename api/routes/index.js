const express = require("express");
const ApiError = require("./../utils/ApiError");
const apiResponse = require("../utils/apiResponse");
const httpStatus = require("http-status");

const router = express.Router();

const guestRoute = require("./guest.route");

// Backend
const beAuthRoute = require("./backEnd/auth.route");
const beUtilitiesRoute = require("./backEnd/utilities.route");
const beDashboardRoute = require("./backEnd/dashboard.route");
const beUmRoute = require("./backEnd/um.route");
const beWsRoute = require("./backEnd/ws.route");
const beWorkspaceRoute = require("./backEnd/workspace.route");
const beClientRoute = require("./backEnd/client.route");

// Frontend
const feAuthRoute = require("./frontEnd/auth.route");
const feUtilitiesRoute = require("./frontEnd/utilities.route");
const feLandingRoute = require("./frontEnd/landing.route");
const feOrderRoute = require("./frontEnd/order.route");
const feTravelRoute = require("./frontEnd/travel.route");
const feAccountRoute = require("./frontEnd/account.route");
const feProductsRoute = require("./frontEnd/products.route");
const fePaymentsRoute = require("./frontEnd/payments.route");

router.use("/", guestRoute);

// Backend
router.use("/back-end/auth", beAuthRoute);
router.use("/back-end/utilities", beUtilitiesRoute);
router.use("/back-end/dashboard", beDashboardRoute);
router.use("/back-end/user-management", beUmRoute);
router.use("/back-end/web-setup", beWsRoute);
router.use("/back-end/workspace", beWorkspaceRoute);
router.use("/back-end/client", beClientRoute);

// Frontend
router.use("/front-end/auth", feAuthRoute);
router.use("/front-end/utilities", feUtilitiesRoute);
router.use("/front-end/landing", feLandingRoute);
router.use("/front-end/order", feOrderRoute);
router.use("/front-end/travel", feTravelRoute);
router.use("/front-end/account", feAccountRoute);
router.use("/front-end/products", feProductsRoute);
router.use("/front-end/payments", fePaymentsRoute);

// send back a 404 error for any unknown api request
router.use((req, res, next) => {
    const error = new ApiError(httpStatus.NOT_FOUND);
    return next(error);
});

// convert error to ApiError, if needed
router.use((error, req, res, next) => {
    const status = error.statusCode || res.statusCode || 500;
    // const stack = process.env.NODE_ENVIRONMENT !== "production" ? error.stack : {};
    const stack = error.stack;

    return apiResponse(res, status, error.message, stack);
});

module.exports = router;
