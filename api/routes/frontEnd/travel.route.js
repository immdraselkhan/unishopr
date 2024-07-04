const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../../middlewares/auth.middleware");
const {getTravels, addTravel} = require("../../controllers/frontEnd/travel.controller");

router.get("/", isAuthenticated, getTravels);
router.post("/", isAuthenticated, addTravel);

module.exports = router;
