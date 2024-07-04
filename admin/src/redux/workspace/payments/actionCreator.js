import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchPaymentsAction, refundPaymentAction, fetchPaymentInvoiceAction } = actions;

export const fetchPayments = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'payments',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchPaymentsAction(cb)))
    };
};

export const refundPayment = (data) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'payments/refund',
            auth: 'bearer',
            body: data,
        })
        // }, (cb) => dispatch(refundPaymentsAction(cb)))
    };
};

export const fetchPaymentsToDownload = (queries, action) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'payments-to-download',
            queries,
            auth: 'bearer'
        }, (cb) => action(cb))
    };
};

export const fetchPaymentInvoice = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'payment-invoice',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchPaymentInvoiceAction(cb)))
    };
};