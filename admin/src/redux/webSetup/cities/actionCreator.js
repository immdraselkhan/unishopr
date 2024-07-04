import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchCityAction, fetchCitiesAction, resetCityFormAction } = actions;

export const addCity = (data, action) => {
    return async dispatch => {
        await req.postRequest({ 
            url: `${Constants.WEB_SETUP}cities`, 
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchCities({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchCities = (queries) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}cities`, 
            queries, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchCitiesAction(cb)))
    };
};

export const updateCity = (data, action) => {
    return async dispatch => {
        await req.putRequest({ 
            url: `${Constants.WEB_SETUP}cities/${data._id}`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchCities({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetCityForm = () => dispatch => dispatch(resetCityFormAction());
export const fetchCity = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}cities/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchCityAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteCity = (_id) => {
    return async dispatch => {
        await req.deleteRequest({ 
            url: `${Constants.WEB_SETUP}cities/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCities({page: 1, perPage: 10})))
    };
};
