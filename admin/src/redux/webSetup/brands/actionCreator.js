import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchBrandAction, fetchBrandsAction, resetBrandFormAction } = actions;

export const addBrand = (data, action) => {
    return async dispatch => {
        await req.postRequest({ url: Constants.WEB_SETUP + 'brands', auth: 'bearer', body: data}, async (cb) => {
            await dispatch(fetchBrands({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchBrands = (queries) => {
    return async dispatch => {
        await req.getRequest({ url: Constants.WEB_SETUP + 'brands', queries, auth: 'bearer'}, (cb) => dispatch(fetchBrandsAction(cb)))
    };
};

export const updateBrand = (data, action) => {
    return async dispatch => {
        await req.putRequest({ url: Constants.WEB_SETUP + 'brands/' + data._id, auth: 'bearer', body: data},  async (cb) => {
            await dispatch(fetchBrands({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetBrandForm = () => dispatch => dispatch(resetBrandFormAction());
export const fetchBrand = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ url: Constants.WEB_SETUP + 'brands/' + _id, auth: 'bearer'}, async (cb) => {
            await dispatch(fetchBrandAction(cb));
            await action(cb)
        })
    };
};

export const deleteBrand = (id) => {
    return async dispatch => {
        await req.deleteRequest({ url: Constants.WEB_SETUP + 'brands/' + id, auth: 'bearer'}, (cb) => dispatch(fetchBrands({page: 1, perPage: 10})))
    };
};
