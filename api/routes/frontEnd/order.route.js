const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("./../../middlewares/auth.middleware");
const {getLeads, addLead, getOrders, updateLead} = require("./../../controllers/frontEnd/order.controller");

router.get("/leads", isAuthenticated, getLeads);
router.get("/orders", isAuthenticated, getOrders);
router.post("/leads", isAuthenticated, addLead);
router.put("/leads", isAuthenticated, updateLead);

module.exports = router;
