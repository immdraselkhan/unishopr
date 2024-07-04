const express = require("express");
const router = express.Router();
const {isAuthenticated, isScopePermitted} = require("../../middlewares/auth.middleware");

const {
    addUser,
    updateUser,
    getUsers,
    getUsersToDownload,
    getUser,
    getTravelers,
    updateTraveler,
    travelerRequest,
    travelersApprove,
    getPartners,
    updatePartner,
    partnerRequest,
    partnersApprove,
} = require("../../controllers/backEnd/clients.controller");

const {
    addUserValidation,
    updateUserValidation,
    getUsersValidation,
    getUserValidation,
    getTravelersValidation,
    updateTravelerValidation,
    travelerRequestValidation,
    travelersApproveValidation,
} = require("../../validations/backEnd/clients.validation");

router.post("/users", isAuthenticated, isScopePermitted("clients_users_create"), addUserValidation, addUser);
router.put("/users/update", isAuthenticated, isScopePermitted("clients_users_update"), updateUserValidation, updateUser);
router.get("/users", isAuthenticated, isScopePermitted('clients_users_index'), getUsers);
router.get("/users-to-download", isAuthenticated, isScopePermitted('workspace_users_index'), getUsersToDownload);
router.get("/users/:_id", isAuthenticated, isScopePermitted('clients_users_index'), getUser);

router.get("/travelers", isAuthenticated, isScopePermitted('clients_travelers_index'), getTravelers);
router.put("/travelers/update", isAuthenticated, isScopePermitted('clients_travelers_update'), updateTraveler);
router.put("/travelers/request", isAuthenticated, isScopePermitted('clients_travelers_create'),  travelerRequest);
router.put("/travelers/approve", isAuthenticated, isScopePermitted('clients_travelers_update'),  travelersApprove);

router.get("/partners", isAuthenticated, isScopePermitted('clients_partners_index'), getPartners);
router.put("/partners/update", isAuthenticated, isScopePermitted('clients_partners_update'), updatePartner);
router.put("/partners/request", isAuthenticated, isScopePermitted('clients_partners_create'),  partnerRequest);
router.put("/partners/approve", isAuthenticated, isScopePermitted('clients_partners_update'),  partnersApprove);

module.exports = router;
