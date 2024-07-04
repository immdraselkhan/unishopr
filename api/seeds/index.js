let isSeedRunnable = false;

const updateSeedRunnable = value => {
    if (typeof value !== "boolean") {
        console.log("to enable seed boolean is required");
    }

    if (typeof value === "boolean") {
        isSeedRunnable = value;
    }

    if (isSeedRunnable) {
        // require("./oAuthClient.seed");
        // require("./beUser.seed");
        require("./bePermissions.seed");
        // require("./feUser.seed");
        // require("./feOrder.seed");
        // require("./fePayment.seed");
        // require("./feUserDate.seed");
        // require("./feOrderInvoiceId.seed");
        // require("./fePaymentInvoiceId.seed");
        // require("./feOrderPaymentInvoiceId.seed");
    }
};

module.exports = updateSeedRunnable;
