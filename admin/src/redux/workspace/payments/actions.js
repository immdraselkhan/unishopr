const actions = {
    FETCH_PAYMENTS: 'FETCH_PAYMENTS',
    REFUND_PAYMENT: 'REFUND_PAYMENT',
    FETCH_PAYMENT_INVOICE: 'FETCH_PAYMENT_INVOICE',

    fetchPaymentsAction: (data) => {
        return {
            type: actions.FETCH_PAYMENTS,
            data: data
        };
    },
    refundPaymentAction: (data) => {
        return {
            type: actions.REFUND_PAYMENT,
            data: data
        };
    },
    fetchPaymentInvoiceAction: (data) => {
        return {
            type: actions.FETCH_PAYMENT_INVOICE,
            data: data
        };
    },
}

export default actions;
