import actions from './actions';
import {RequestService as req} from '../../../services/requestService';
import { Constants } from '../../../config/constants';

const { fetchRolesAction, fetchRoleAction, resetRoleFormAction } = actions;

export const addRole = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.USER_MANAGEMENT}roles`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchRoles({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchRoles = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}roles`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchRolesAction(cb)))
    };
};

export const updateRole = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.USER_MANAGEMENT}roles/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchRoles({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetRoleForm = () => dispatch => dispatch(resetRoleFormAction());
export const fetchRole = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}roles/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchRoleAction(cb));
            if (action) await action();
        })
    };
};

export const deleteRole = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.USER_MANAGEMENT}roles/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchRoles({page: 1, perPage: 10})))
    };
};
