import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchProductAction, fetchProductsAction, resetProductFormAction } = actions;

export const fetchProducts = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'products',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchProductsAction(cb)))
    };
};

export const fetchProduct = (_id, action = null) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WORKSPACE + 'products/' + _id,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchProductAction(cb));
            if (action) action(cb)
        })
    };
};

export const resetProductForm = () => dispatch => dispatch(resetProductFormAction());

export const addProduct = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: Constants.WORKSPACE + 'products',
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchProducts());
            await dispatch(action);
        })
    };
};

export const updateProduct = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'products/' + data._id,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchProducts());
            await dispatch(action);
        })
    };
};

export const deleteProduct = (id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: Constants.WORKSPACE + 'products/' + id,
            auth: 'bearer'
        }, (cb) => dispatch(fetchProducts()))
    };
};

export const updateProductStatus = (id) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'products/status/' + id,
            auth: 'bearer'
        }, (cb) => null)
    };
};

export const addAttribute = ({data, productId, action}) => {
    return async dispatch => {
        await req.postRequest({
            url: Constants.WORKSPACE + 'products/attribute/' + productId,
            body: data,
            auth: 'bearer'
        }, (cb) => {
            dispatch(fetchProduct(productId))
            if (action) action()
        })
    };
};

export const updateAttribute = ({data, productId, action}) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'products/attribute/' + productId,
            body: data,
            auth: 'bearer'
        }, (cb) => {
            dispatch(fetchProduct(productId))
            if (action) action()
        })
    };
};

export const deleteAttribute = (queries) => {
    return async dispatch => {
        await req.deleteRequest({
            url: Constants.WORKSPACE + 'products/attribute/' + queries.productId,
            queries,
            auth: 'bearer'
        }, (cb) => {
            dispatch(fetchProduct(queries.productId))
        })
    };
};
