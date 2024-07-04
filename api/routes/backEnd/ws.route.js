const express = require("express");
const router = express.Router();
const {isAuthenticated, isScopePermitted} = require("./../../middlewares/auth.middleware");
const {
    addCategory, getCategories, deleteCategory, getCategory, updateCategory,
    addSubCategory, getSubCategories, deleteSubCategory, getSubCategory, updateSubCategory,
    addChildCategory, getChildCategories, deleteChildCategory, getChildCategory, updateChildCategory,
    addCountry, getCountries, getCountry, updateCountry, deleteCountry,
    addCity, getCities, getCity, updateCity, deleteCity,
    addLocation, getLocations, getLocation, updateLocation, deleteLocation,
    addTag, getTags, deleteTag, getTag, updateTag,
    getBanners, getBanner, addBanner, updateBanner, deleteBanner,
    getBrands, getBrand, addBrand, updateBrand, deleteBrand,
    getLeadAttributes, getLeadAttribute, addLeadAttribute, updateLeadAttribute, deleteLeadAttribute,
    getLeadTimelines, getLeadTimeline, addLeadTimeline, updateLeadTimeline, deleteLeadTimeline,
} = require("./../../controllers/backEnd/ws.controller");
const {
    getCategoriesValidation, getCategoryValidation, addCategoryValidation, updateCategoryValidation, deleteCategoryValidation,
    getSubCategoriesValidation, getSubCategoryValidation, addSubCategoryValidation, updateSubCategoryValidation, deleteSubCategoryValidation,
    getChildCategoriesValidation, getChildCategoryValidation, addChildCategoryValidation, updateChildCategoryValidation, deleteChildCategoryValidation,
    getCountriesValidation, getCountryValidation, addCountryValidation, updateCountryValidation, deleteCountryValidation,
    getCitiesValidation, getCityValidation, addCityValidation, updateCityValidation, deleteCityValidation,
    getLocationsValidation, getLocationValidation, addLocationValidation, updateLocationValidation, deleteLocationValidation,
    getTagsValidation, getTagValidation, addTagValidation, updateTagsValidation, deleteTagValidation,
    getBannersValidation, getBannerValidation, addBannerValidation, updateBannerValidation, deleteBannerValidation,
    getBrandsValidation, getBrandValidation, addBrandValidation, deleteBrandValidation, updateBrandValidation,
    getLeadAttributesValidation, getLeadAttributeValidation, addLeadAttributeValidation, updateLeadAttributeValidation, deleteLeadAttributeValidation,
    getLeadTimelinesValidation, getLeadTimelineValidation, addLeadTimelineValidation, updateLeadTimelineValidation, deleteLeadTimelineValidation,
} = require("../../validations/backEnd/ws.validation")

router.get("/categories", isAuthenticated, isScopePermitted('ws_categories_index'), getCategoriesValidation, getCategories);
router.get("/categories/:id", isAuthenticated, isScopePermitted('ws_categories_index'), getCategoryValidation, getCategory);
router.post("/categories", isAuthenticated, isScopePermitted('ws_categories_create'), addCategoryValidation, addCategory);
router.put("/categories/:id", isAuthenticated, isScopePermitted('ws_categories_update'), updateCategoryValidation, updateCategory);
router.delete("/categories/:id", isAuthenticated, isScopePermitted('ws_categories_delete'), deleteCategoryValidation, deleteCategory);

router.get("/sub-categories", isAuthenticated, isScopePermitted('ws_sub_categories_index'), getSubCategoriesValidation, getSubCategories);
router.get("/sub-categories/:id", isAuthenticated, isScopePermitted('ws_sub_categories_index'), getSubCategoryValidation, getSubCategory);
router.post("/sub-categories", isAuthenticated, isScopePermitted('ws_sub_categories_create'), addSubCategoryValidation, addSubCategory);
router.put("/sub-categories/:id", isAuthenticated, isScopePermitted('ws_sub_categories_update'), updateSubCategoryValidation, updateSubCategory);
router.delete("/sub-categories/:id", isAuthenticated, isScopePermitted('ws_sub_categories_delete'), deleteSubCategoryValidation, deleteSubCategory);

router.get("/child-categories", isAuthenticated, isScopePermitted('ws_child_categories_index'), getChildCategoriesValidation, getChildCategories);
router.get("/child-categories/:id", isAuthenticated, isScopePermitted('ws_child_categories_index'), getChildCategoryValidation, getChildCategory);
router.post("/child-categories", isAuthenticated, isScopePermitted('ws_child_categories_create'), addChildCategoryValidation, addChildCategory);
router.put("/child-categories/:id", isAuthenticated, isScopePermitted('ws_child_categories_update'), updateChildCategoryValidation, updateChildCategory);
router.delete("/child-categories/:id", isAuthenticated, isScopePermitted('ws_child_categories_delete'), deleteChildCategoryValidation, deleteChildCategory);

router.get("/countries", isAuthenticated, isScopePermitted('ws_countries_index'), getCountriesValidation, getCountries);
router.get("/countries/:id", isAuthenticated, isScopePermitted('ws_countries_index'), getCountryValidation, getCountry);
router.post("/countries", isAuthenticated, isScopePermitted('ws_countries_create'), addCountryValidation, addCountry);
router.put("/countries/:id", isAuthenticated, isScopePermitted('ws_countries_update'), updateCountryValidation, updateCountry);
router.delete("/countries/:id", isAuthenticated, isScopePermitted('ws_countries_delete'), deleteCountryValidation, deleteCountry);

router.get("/cities", isAuthenticated, isScopePermitted('ws_cities_index'), getCitiesValidation, getCities);
router.get("/cities/:id", isAuthenticated, isScopePermitted('ws_cities_index'), getCityValidation, getCity);
router.post("/cities", isAuthenticated, isScopePermitted('ws_cities_create'), addCityValidation, addCity);
router.put("/cities/:id", isAuthenticated, isScopePermitted('ws_cities_update'), updateCityValidation, updateCity);
router.delete("/cities/:id", isAuthenticated, isScopePermitted('ws_cities_delete'), deleteCityValidation, deleteCity);

router.get("/locations", isAuthenticated, isScopePermitted('ws_locations_index'), getLocationsValidation, getLocations);
router.get("/locations/:id", isAuthenticated, isScopePermitted('ws_locations_index'), getLocationValidation, getLocation);
router.post("/locations", isAuthenticated, isScopePermitted('ws_locations_create'), addLocationValidation, addLocation);
router.put("/locations/:id", isAuthenticated, isScopePermitted('ws_locations_update'), updateLocationValidation, updateLocation);
router.delete("/locations/:id", isAuthenticated, isScopePermitted('ws_locations_delete'), deleteLocationValidation, deleteLocation);

router.get("/tags", isAuthenticated, isScopePermitted('ws_tags_index'), getTagsValidation, getTags);
router.get("/tags/:id", isAuthenticated, isScopePermitted('ws_tags_index'), getTagValidation, getTag);
router.post("/tags", isAuthenticated, isScopePermitted('ws_tags_create'), addTagValidation, addTag);
router.put("/tags/:id", isAuthenticated, isScopePermitted('ws_tags_update'), updateTagsValidation, updateTag);
router.delete("/tags/:id", isAuthenticated, isScopePermitted('ws_tags_delete'), deleteTagValidation, deleteTag);

router.get("/banners", isAuthenticated, isScopePermitted('ws_banners_index'), getBannersValidation, getBanners);
router.get("/banners/:id", isAuthenticated, isScopePermitted('ws_banners_index'), getBannerValidation, getBanner);
router.post("/banners", isAuthenticated, isScopePermitted('ws_banners_create'), addBannerValidation, addBanner);
router.put("/banners/:id", isAuthenticated, isScopePermitted('ws_banners_update'), updateBannerValidation, updateBanner);
router.delete("/banners/:id", isAuthenticated, isScopePermitted('ws_banners_delete'), deleteBannerValidation, deleteBanner);

router.get("/brands", isAuthenticated, isScopePermitted('ws_brands_index'), getBrandsValidation, getBrands);
router.get('/brands/:id', isAuthenticated, isScopePermitted('ws_brands_index'), getBrandValidation, getBrand);
router.post("/brands", isAuthenticated, isScopePermitted('ws_brands_create'), addBrandValidation, addBrand);
router.put("/brands/:id", isAuthenticated, isScopePermitted('ws_brands_update'), updateBrandValidation, updateBrand);
router.delete("/brands/:id", isAuthenticated, isScopePermitted('ws_brands_delete'), deleteBrandValidation, deleteBrand);

router.get("/lead-attributes", isAuthenticated, isScopePermitted('ws_lead_attributes_index'), getLeadAttributesValidation, getLeadAttributes);
router.get("/lead-attributes/:id", isAuthenticated, isScopePermitted('ws_lead_attributes_index'), getLeadAttributeValidation, getLeadAttribute);
router.post("/lead-attributes", isAuthenticated, isScopePermitted('ws_lead_attributes_create'), addLeadAttributeValidation, addLeadAttribute);
router.put("/lead-attributes/:id", isAuthenticated, isScopePermitted('ws_ws_lead_attributes_update'), updateLeadAttributeValidation, updateLeadAttribute);
router.delete("/lead-attributes/:id", isAuthenticated, isScopePermitted('ws_ws_lead_attributes_delete'), deleteLeadAttributeValidation, deleteLeadAttribute);

router.get("/lead-timelines", isAuthenticated, isScopePermitted('ws_lead_timelines_index'), getLeadTimelinesValidation, getLeadTimelines);
router.get("/lead-timelines/:id", isAuthenticated, isScopePermitted('ws_lead_timelines_index'), getLeadTimelineValidation, getLeadTimeline);
router.post("/lead-timelines", isAuthenticated, isScopePermitted('ws_lead_timelines_create'), addLeadTimelineValidation, addLeadTimeline);
router.put("/lead-timelines/:id", isAuthenticated, isScopePermitted('ws_ws_lead_timelines_update'), updateLeadTimelineValidation, updateLeadTimeline);
router.delete("/lead-timelines/:id", isAuthenticated, isScopePermitted('ws_ws_lead_timelines_delete'), deleteLeadTimelineValidation, deleteLeadTimeline);

module.exports = router;
