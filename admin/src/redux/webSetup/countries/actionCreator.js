import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchCountryAction, fetchCountriesAction, resetCountryFormAction } = actions;

export const addCountry = (data, action) => {
    return async dispatch => {
        await req.postRequest({  
            url: `${Constants.WEB_SETUP}countries`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchCountries({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchCountries = (queries) => {
    return async dispatch => {
        await req.getRequest({  
            url: `${Constants.WEB_SETUP}countries`,
            queries, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchCountriesAction(cb)))
    };
};

export const updateCountry = (data, action) => {
    return async dispatch => {
        await req.putRequest({ 
            url: `${Constants.WEB_SETUP}countries/${data._id}`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchCountries({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetCountryForm = () => dispatch => dispatch(resetCountryFormAction());
export const fetchCountry = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}countries/${_id}`, 
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchCountryAction(cb));
            if (action) action(cb)
        })
    };
};

export const deleteCountry = (_id) => {
    return async dispatch => {
        await req.deleteRequest({ 
            url: `${Constants.WEB_SETUP}countries/${_id}`, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchCountries({page: 1, perPage: 10})))
    };
};
