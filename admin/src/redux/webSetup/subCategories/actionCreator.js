import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchSubCategoryAction, fetchSubCategoriesAction, resetSubCategoryFormAction } = actions;

export const addSubCategory = (data, action) => {
    return async dispatch => {
        await req.postRequest({ 
            url: `${Constants.WEB_SETUP}sub-categories`, 
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchSubCategories({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchSubCategories = (queries) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}sub-categories`, 
            queries, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchSubCategoriesAction(cb)))
    };
};

export const updateSubCategory = (data, action) => {
    return async dispatch => {
        await req.putRequest({ 
            url: `${Constants.WEB_SETUP}sub-categories/${data._id}`,
            auth: 'bearer', 
            body: data
        }, async (cb) => {
            await dispatch(fetchSubCategories({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetSubCategoryForm = () => dispatch => dispatch(resetSubCategoryFormAction());
export const fetchSubCategory = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}sub-categories/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchSubCategoryAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteSubCategory = (_id) => {
    return async dispatch => {
        await req.deleteRequest({ 
            url: `${Constants.WEB_SETUP}sub-categories/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchSubCategories({page: 1, perPage: 10})))
    };
};
