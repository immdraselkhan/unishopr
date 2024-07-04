const express = require("express");
const router = express.Router();

const {baseUrl, assignTraveler} = require("./../controllers/guest.controller");

router.get("", baseUrl);
router.get("/assign-traveler", assignTraveler);

module.exports = router;
