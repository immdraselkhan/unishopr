const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../../middlewares/auth.middleware");

const {
    getRoles,
    getDepartments,
    getLocations,
    getCountries,
    getCities,
    getCategories,
    getSubCategory,
    getChildCategory,
    getUsers,
    getUser,
    travelers,
    getTags,
    getLeadAttributes,
    getLeadTimelines,
} = require("../../controllers/backEnd/utilities.controller");

router.get("/roles", isAuthenticated, getRoles);
router.get("/departments", isAuthenticated, getDepartments);
router.get("/countries", isAuthenticated, getCountries);
router.get("/cities", isAuthenticated, getCities);
router.get("/locations", isAuthenticated, getLocations);
router.get("/categories", isAuthenticated, getCategories);
router.get("/sub-categories/:categoryId", isAuthenticated, getSubCategory);
router.get("/child-categories/:subCategoryId", isAuthenticated, getChildCategory);
router.get("/tags", isAuthenticated, getTags);
router.get("/users", isAuthenticated, getUsers);
router.get("/user", isAuthenticated, getUser);
router.get("/travelers", isAuthenticated, travelers);
router.get("/lead-attributes", isAuthenticated, getLeadAttributes);
router.get("/lead-timelines", isAuthenticated, getLeadTimelines);


module.exports = router;
