const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../../middlewares/auth.middleware");
const {
    getUser,
    updateUser,
    updateProfilePicture,
    getPayments,
    updatePhoneOrEmail,
    otpVerify,
    partnerRequest,
} = require("./../../controllers/frontEnd/account.controller");
const { changePhoneEmailValidation } = require("../../validations/frontEnd/account.validation");

router.get("/user", isAuthenticated, getUser);
router.get("/payments", getPayments)
router.put("/user", isAuthenticated, updateUser);
router.put("/update-profile-picture", isAuthenticated,  updateProfilePicture)
router.put("/update-phone-email", isAuthenticated, changePhoneEmailValidation, updatePhoneOrEmail)
router.put("/otp-verify", isAuthenticated, otpVerify)
router.put("/partner-request", isAuthenticated, partnerRequest);

module.exports = router;
