import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchLocationAction, fetchLocationsAction, resetLocationFormAction } = actions;

export const fetchLocations = (queries) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}locations`,
            queries, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchLocationsAction(cb)))
    };
};

export const addLocation = (data, action) => {
    return async dispatch => {
        await req.postRequest({ 
            url: `${Constants.WEB_SETUP}locations`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchLocations({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const updateLocation = (data, action) => {
    return async dispatch => {
        await req.putRequest({ 
            url: `${Constants.WEB_SETUP}locations/${data._id}`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchLocations({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetLocationForm = () => dispatch => dispatch(resetLocationFormAction());
export const fetchLocation = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}locations/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchLocationAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteLocation = (_id) => {
    return async dispatch => {
        await req.deleteRequest({ 
            url: `${Constants.WEB_SETUP}locations/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLocations({page: 1, perPage: 10})))
    };
};
