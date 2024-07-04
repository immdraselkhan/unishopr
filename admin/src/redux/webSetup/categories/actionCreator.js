import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchCategoryAction, fetchCategoriesAction, resetCategoryFormAction } = actions;

export const addCategory = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WEB_SETUP}categories`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchCategories({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchCategories = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}categories`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCategoriesAction(cb)))
    };
};

export const updateCategory = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WEB_SETUP}categories/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchCategories({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetCategoryForm = () => dispatch => dispatch(resetCategoryFormAction());
export const fetchCategory = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}categories/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchCategoryAction(cb));
            if (action) await action();
        })
    };
};

export const deleteCategory = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.WEB_SETUP}categories/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCategories({page: 1, perPage: 10})))
    };
};
