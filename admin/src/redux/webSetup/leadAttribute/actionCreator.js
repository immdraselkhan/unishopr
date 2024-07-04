import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchLeadAttributeAction, fetchLeadAttributesAction, resetLeadAttributeFormAction } = actions;

export const addLeadAttribute = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WEB_SETUP}lead-attributes`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchLeadAttributes({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchLeadAttributes = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}lead-attributes`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadAttributesAction(cb)))
    };
};

export const updateLeadAttribute = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WEB_SETUP}lead-attributes/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchLeadAttributes({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetLeadAttributeForm = () => dispatch => dispatch(resetLeadAttributeFormAction());
export const fetchLeadAttribute = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}lead-attributes/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchLeadAttributeAction(cb));
            if (action) await action();
        })
    };
};

export const deleteLeadAttribute = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.WEB_SETUP}lead-attributes/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadAttributes({page: 1, perPage: 10})))
    };
};
