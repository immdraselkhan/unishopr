import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

import {fetchTravelers} from "../travelers/actionCreator";
import {fetchPartners} from "../partners/actionCreator";
const { fetchUsersAction, fetchUserInfoAction, resetUserFormAction, resetRequestFormAction } = actions;

export const addUser = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.CLIENTS}users`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const updateUser = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.CLIENTS}users/update`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchUserInfo(data._id));
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
}

export const resetUserForm = () => dispatch => dispatch(resetUserFormAction());

export const travelerRequest = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.CLIENTS}travelers/request`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchTravelers({page: 1, perPage: 10}));
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
}

export const updateTraveler= (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.CLIENTS}travelers/update`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTravelers({page: 1, perPage: 10}));
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(fetchUserInfo(data._id));
            await dispatch(action);
        })
    };
}

export const partnerRequest = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.CLIENTS}partners/request`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchPartners({page: 1, perPage: 10}));
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
}

export const updatePartner= (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.CLIENTS}partners/update`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchPartners({page: 1, perPage: 10}));
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(fetchUserInfo(data._id));
            await dispatch(action);
        })
    };
}


export const fetchUsers = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.CLIENTS + 'users',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchUsersAction(cb)))
    };
};


export const fetchUserInfo = (_id) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.CLIENTS + 'users/' + _id,
            auth: 'bearer'
        }, (cb) => dispatch(fetchUserInfoAction(cb)))
    };
}

export const fetchUsersToDownload = (queries, action) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.CLIENTS + 'users-to-download',
            queries,
            auth: 'bearer'
        }, (cb) => action(cb))
    };
};