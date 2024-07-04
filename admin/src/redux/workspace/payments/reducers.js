import actions from "./actions";

const {FETCH_PAYMENTS, FETCH_PAYMENT_INVOICE} = actions;
const initState = {
    payments: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    paymentInvoice: [],
};

const PaymentsReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_PAYMENTS:
            return {
                ...state,
                payments: data
            }
        case FETCH_PAYMENT_INVOICE:
            return {
                ...state,
                paymentInvoice: data
            }
        default:
            return state;
    }
}

export default PaymentsReducer;
