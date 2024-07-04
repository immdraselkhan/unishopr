import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchChildCategoryAction, fetchChildCategoriesAction, resetChildCategoryFormAction } = actions;

export const addChildCategory = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WEB_SETUP}child-categories`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchChildCategories({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchChildCategories = (queries) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}child-categories`, 
            queries, 
            auth: 'bearer'
        }, (cb) => dispatch(fetchChildCategoriesAction(cb)))
    };
};

export const updateChildCategory = (data, action) => {
    return async dispatch => {
        await req.putRequest({ 
            url: `${Constants.WEB_SETUP}child-categories/${data._id}`,
            auth: 'bearer', 
            body: data
        },  async (cb) => {
            await dispatch(fetchChildCategories({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetChildCategoryForm = () => dispatch => dispatch(resetChildCategoryFormAction());
export const fetchChildCategory = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ 
            url: `${Constants.WEB_SETUP}child-categories/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchChildCategoryAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteChildCategory = (_id) => {
    return async dispatch => {
        await req.deleteRequest({ 
            url: `${Constants.WEB_SETUP}child-categories/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchChildCategories({page: 1, perPage: 10})))
    };
};
