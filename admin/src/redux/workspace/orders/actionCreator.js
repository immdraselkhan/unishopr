import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchOrdersAction, fetchOrderAction, fetchOrderFormAction } = actions;

export const fetchOrders = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'orders',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchOrdersAction(cb)))
    };
};

export const resetOrderForm = () => dispatch => dispatch(fetchOrderFormAction());
export const fetchOrder = (order, action) => {
    return async dispatch => {
        await dispatch(fetchOrderAction(order));
        if (action) await action();
    };
};

export const updateOrder = (body, action) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'orders/' + body._id,
            body,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchOrders({page: 1, perPage: 10}))
            if (action) await action()
        })
    };
};

export const fetchOrdersToDownload = (queries, action) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'orders-to-download',
            queries,
            auth: 'bearer'
        }, (cb) => action(cb))
    };
};