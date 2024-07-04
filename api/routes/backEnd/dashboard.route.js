const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../../middlewares/auth.middleware");

const {
    getUsersStats,
    getPurchasesStats,
    getRevenueStats,
} = require("../../controllers/backEnd/dashboard.controller");

router.get("/users-stats", isAuthenticated, getUsersStats);
router.get("/purchases-stats", isAuthenticated, getPurchasesStats);
router.get("/revenue-stats", isAuthenticated, getRevenueStats);

module.exports = router;
