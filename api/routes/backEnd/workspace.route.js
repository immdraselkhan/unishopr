const express = require("express");
const router = express.Router();
const { isAuthenticated, isScopePermitted } = require("../../middlewares/auth.middleware");
const {
    addLead, getLeads, getLead, updateLead, addLeadUpdate, updateLeadUpdate, deleteLeadUpdate, leadsBulkImport,
    getTravels, getTravel, addTravel, updateTravel, deleteTravel, getTravelLeads, addTravelLeads, resolveTravel,
    addProduct, getProduct, getProducts, updateProduct, deleteProduct, updateProductStatus, addProductAttribute, deleteProductAttribute, updateProductAttribute,
    getPayments, refundPayment, getPaymentsToDownload, getPaymentInvoice,
    getOrders, updateOrder, getOrdersToDownload,
    updateLeadAdditional,
    addCoupon, getCoupons, deleteCoupon, getCoupon, updateCoupon,
} = require("../../controllers/backEnd/workspace.controller");
const {
    getLeadsValidation, getLeadValidation, updateLeadValidation, addLeadUpdateValidation, updateLeadUpdateValidation,
    getTravelsValidation, getTravelValidation, addTravelValidation, updateTravelValidation, deleteTravelValidation, getTravelLeadsValidation, addTravelLeadsValidation, resolveTravelValidation,
    getCouponsValidation, getCouponValidation, addCouponValidation, updateCouponValidation, deleteCouponValidation,
} = require("../../validations/backEnd/workspace.validation");

router.get("/leads", isAuthenticated, isScopePermitted('workspace_leads_index'), getLeads)
router.get("/lead/:_id", isAuthenticated, isScopePermitted('workspace_leads_index'), getLeadValidation, getLead)
router.post("/leads", isAuthenticated, isScopePermitted('workspace_leads_create'), addLead);
router.put("/leads/:_id", isAuthenticated, isScopePermitted('workspace_leads_update'), updateLead)
router.post("/leads/update/:_id", isAuthenticated, isScopePermitted('workspace_leads_create'), addLeadUpdateValidation, addLeadUpdate)
router.put("/leads/update/:_id", isAuthenticated, isScopePermitted('workspace_leads_update'), updateLeadUpdateValidation, updateLeadUpdate)
router.delete("/leads/update/:_id", isAuthenticated, isScopePermitted('workspace_leads_delete'), deleteLeadUpdate)
router.put("/leads/additional/:_id", isAuthenticated, isScopePermitted('workspace_leads_update'), updateLeadAdditional)
router.post("/leads-bulk-import", isAuthenticated, isScopePermitted('workspace_leads_create'), leadsBulkImport)

router.get("/travels", isAuthenticated, isScopePermitted('workspace_travels_index'), getTravels)
router.get("/travels/:_id", isAuthenticated, isScopePermitted('workspace_travels_index'), getTravelValidation, getTravel)
router.post("/travels", isAuthenticated, isScopePermitted('workspace_travels_create'), addTravelValidation, addTravel)
router.put("/travels/:_id", isAuthenticated, isScopePermitted('workspace_travels_update'), updateTravelValidation, updateTravel)
router.delete("/travels/:_id", isAuthenticated, isScopePermitted('workspace_travels_delete'), deleteTravelValidation, deleteTravel)
router.get("/travels/leads/:_id", isAuthenticated, isScopePermitted('workspace_travels_index'), getTravelLeadsValidation, getTravelLeads)
router.post("/travels/leads/:_id", isAuthenticated, isScopePermitted('workspace_travels_create'), addTravelLeadsValidation, addTravelLeads)
router.put("/travel/resolve/:_id", isAuthenticated, isScopePermitted('workspace_travels_update'), resolveTravelValidation, resolveTravel)

router.get("/products", isAuthenticated, isScopePermitted('workspace_products_index'), getProducts);
router.get("/products/:id", isAuthenticated, isScopePermitted('workspace_products_index'), getProduct);
router.post("/products", isAuthenticated, isScopePermitted('workspace_products_create'), addProduct);
router.put("/products/:id", isAuthenticated, isScopePermitted('workspace_products_update'), updateProduct);
router.put("/products/status/:id", isAuthenticated, isScopePermitted('workspace_products_update'), updateProductStatus);
router.delete("/products/:id", isAuthenticated, isScopePermitted('workspace_products_delete'), deleteProduct);
router.post("/products/attribute/:id", isAuthenticated, isScopePermitted('workspace_products_create'), addProductAttribute);
router.put("/products/attribute/:id", isAuthenticated, isScopePermitted('workspace_products_update'), updateProductAttribute);
router.delete("/products/attribute/:id", isAuthenticated, isScopePermitted('workspace_products_delete'), deleteProductAttribute);

router.get("/payments", isAuthenticated, isScopePermitted('workspace_payments_index'), getPayments);
router.put("/payments/refund", isAuthenticated, isScopePermitted('workspace_payments_index'), refundPayment);
router.get("/payments-to-download", isAuthenticated, isScopePermitted('workspace_payments_index'), getPaymentsToDownload);
router.get("/payment-invoice", isAuthenticated, isScopePermitted('workspace_payments_index'), getPaymentInvoice);

router.get("/orders", isAuthenticated, isScopePermitted('workspace_orders_index'), getOrders);
router.get("/orders-to-download", isAuthenticated, isScopePermitted('workspace_orders_index'), getOrdersToDownload);
router.put("/orders/:id", isAuthenticated, isScopePermitted('workspace_orders_update'), updateOrder);

router.get("/coupons", isAuthenticated, isScopePermitted('workspace_coupons_index'), getCouponsValidation, getCoupons);
router.get("/coupons/:_id", isAuthenticated, isScopePermitted('workspace_coupons_index'), getCouponValidation, getCoupon);
router.post("/coupons", isAuthenticated, isScopePermitted('workspace_coupons_create'), addCouponValidation, addCoupon);
router.put("/coupons/:_id", isAuthenticated, isScopePermitted('workspace_coupons_update'), updateCouponValidation, updateCoupon);
router.delete("/coupons/:_id", isAuthenticated, isScopePermitted('workspace_coupons_delete'), deleteCouponValidation, deleteCoupon);

module.exports = router;
