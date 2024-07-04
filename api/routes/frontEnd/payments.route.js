const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../../middlewares/auth.middleware");
const {
    sslPayment,
    sslPaymentIpn,
    sslPaymentRedirect,
    getPayments,
    manualPayment,
    coupon
} = require("./../../controllers/frontEnd/payments.controller");

router.post("/ssl", isAuthenticated, sslPayment)
router.post("/ssl-ipn", sslPaymentIpn)
router.post("/ssl-redirect", sslPaymentRedirect)
router.post("/manual", manualPayment)
router.post("/coupon", isAuthenticated, coupon)

module.exports = router;
