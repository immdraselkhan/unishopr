const express = require("express");
const router = express.Router();
const {isClientAuthenticated} = require("./../../middlewares/auth.middleware");

const {
    product, banners, brands, getNotifications, updateNotifications
} = require("./../../controllers/frontEnd/landing.controller");

router.get("/product/:_id", isClientAuthenticated, product)
router.get("/banners", isClientAuthenticated, banners)
router.get("/brands", isClientAuthenticated, brands)
router.get("/notifications", isClientAuthenticated, getNotifications);
router.put("/update-notifications", isClientAuthenticated, updateNotifications);


module.exports = router;
