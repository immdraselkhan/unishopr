import {Constants} from '../../../config/constants';
import actions from './actions';
import {RequestService as req} from '../../../services/requestService';

const {fetchUsersAction, resetUserFormAction, fetchUserAction} = actions;

export const addUser = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.USER_MANAGEMENT}users`,
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
            url: `${Constants.USER_MANAGEMENT}users/${data._id}`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetUserForm = () => dispatch => dispatch(resetUserFormAction());
export const fetchUser = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}users/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchUserAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteUser = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.USER_MANAGEMENT}users/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchUsers({page: 1, perPage: 10})))
    };
};

export const fetchUsers = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}users`,
            auth: 'bearer',
            queries: queries
        }, async (cb) => {
            await dispatch(fetchUsersAction(cb));
        })
    }
};
