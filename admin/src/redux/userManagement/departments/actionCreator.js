import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchDepartmentAction, fetchDepartmentsAction, resetDepartmentFormAction } = actions;

export const addDepartment = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.USER_MANAGEMENT}departments`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchDepartments({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchDepartments = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}departments`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchDepartmentsAction(cb)))
    };
};

export const updateDepartment = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.USER_MANAGEMENT}departments/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchDepartments({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetDepartmentForm = () => dispatch => dispatch(resetDepartmentFormAction());
export const fetchDepartment = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}departments/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchDepartmentAction(cb));
            if (action) await action();
        })
    };
};

export const deleteDepartment = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.USER_MANAGEMENT}departments/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchDepartments({page: 1, perPage: 10})))
    };
};
