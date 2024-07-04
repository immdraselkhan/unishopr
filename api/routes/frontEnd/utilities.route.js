const express = require("express");
const router = express.Router();
const {isClientAuthenticated} = require("../../middlewares/auth.middleware");

const {getCountries, categoryTree, categoryTreeMobile, getCities} = require("../../controllers/frontEnd/utilities.controller");

router.get("/countries", isClientAuthenticated, getCountries);
router.get("/category-tree", isClientAuthenticated, categoryTree)
router.get("/category-tree-mobile", isClientAuthenticated, categoryTreeMobile)
router.get("/cities", isClientAuthenticated, getCities);

module.exports = router;
