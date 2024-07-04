import { Constants } from "../../../config/constants";
import { RequestService as req } from "../../../services/requestService";
import actions from './actions';

const { fetchBannersAction, fetchBannerAction, resetBannerFormAction } = actions;

export const addBanner = (data, action) => {
    return async dispatch => {
        await req.postRequest({ url: Constants.WEB_SETUP + 'banners', auth: 'bearer', body: data}, async (cb) => {
            await dispatch(fetchBanners());
            await dispatch(action);
        })
    };
};

export const fetchBanners = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WEB_SETUP + 'banners',
            queries, auth: 'bearer'
        }, (cb) => dispatch(fetchBannersAction(cb)))
    };
};

export const updateBanner = (data, action) => {
    return async dispatch => {
        await req.putRequest({ url: Constants.WEB_SETUP + 'banners/' + data._id, auth: 'bearer', body: data},  async (cb) => {
            await dispatch(fetchBanners());
            await dispatch(action);
        })
    };
};

export const resetBannerForm = () => dispatch => dispatch(resetBannerFormAction());
export const fetchBanner = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ url: Constants.WEB_SETUP + 'banners/' + _id, auth: 'bearer'}, async (cb) => {
            await dispatch(fetchBannerAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteBanner = (id) => {
    return async dispatch => {
        await req.deleteRequest({ url: Constants.WEB_SETUP + 'banners/' + id, auth: 'bearer'}, (cb) => dispatch(fetchBanners()))
    };
};
