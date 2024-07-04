const express = require("express");
const router = express.Router();
const {isAuthenticated, isClientAuthenticated} = require("./../../middlewares/auth.middleware");
const {getProducts, getNewArrivals, getBestSelling, getRecentOrders} = require("./../../controllers/frontEnd/products.controller");

router.get("/", isClientAuthenticated, getProducts)
router.get("/new-arrivals", isClientAuthenticated, getNewArrivals)
router.get("/best-selling", isClientAuthenticated, getBestSelling)
router.get("/recent-orders", isClientAuthenticated, getRecentOrders)


module.exports = router;
