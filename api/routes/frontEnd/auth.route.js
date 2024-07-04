const express = require("express");
const router = express.Router();
const {isClientAuthenticated, isAuthenticated} = require("./../../middlewares/auth.middleware");
const {
    register,
    otpVerify,
    login,
    socialLogin,
    renew,
    logout
} = require("./../../controllers/frontEnd/auth.controller");
const {
    registerValidation,
    otpVerifyValidation,
    loginValidation,
    renewValidation
} = require("../../validations/frontEnd/auth.validation");

router.post("/register", isClientAuthenticated, registerValidation, register);
router.put("/otp-verify", isClientAuthenticated, otpVerifyValidation, otpVerify);
router.post("/login", isClientAuthenticated, loginValidation, login);
router.put("/social-login", isClientAuthenticated, socialLogin);
router.post("/renew", isClientAuthenticated, renewValidation, renew);
router.delete("/logout", isAuthenticated, logout);

module.exports = router;
