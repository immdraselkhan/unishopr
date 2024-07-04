import actions from './actions'
import { RequestService as req } from "../../../services/requestService";
import { Constants } from "../../../config/constants";
import { fetchUsers } from '../../utilities/actionCreator';

const { fetchCouponAction, fetchCouponsAction, resetCouponFormAction } = actions;

export const addCoupon = (data, action) => {
    return async (dispatch, getState) => {
        await req.postRequest({
            url: `${Constants.WORKSPACE}coupons`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchCoupons({ page: getState()?.workspaceCoupons?.coupons?.page ?? 1, perPage: getState()?.workspaceCoupons?.coupons?.perPage ?? 10 }));
            await dispatch(action);
        })
    };
};

export const fetchCoupons = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}coupons`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCouponsAction(cb)))
    };
};

export const updateCoupon = (data, action) => {
    return async (dispatch, getState) => {
        await req.putRequest({
            url: `${Constants.WORKSPACE}coupons/${data._id}`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchCoupons({ page: getState()?.workspaceCoupons?.coupons?.page ?? 1, perPage: getState()?.workspaceCoupons?.coupons?.perPage ?? 10 }));
            await dispatch(action);
        })
    };
};

export const resetCouponForm = () => dispatch => dispatch(resetCouponFormAction());
export const fetchCoupon = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}coupons/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchCouponAction(cb));
            await action(cb)
            if (cb?.user?._id) await dispatch(fetchUsers({_ids: cb.user._id}))
        })
    };
};

export const deleteCoupon = (_id) => {
    return async (dispatch, getState) => {
        await req.deleteRequest({
            url: `${Constants.WORKSPACE}coupons/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCoupons({ page: getState()?.workspaceCoupons?.coupons?.page ?? 1, perPage: getState()?.workspaceCoupons?.coupons?.perPage ?? 10 })))
    };
};
