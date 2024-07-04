import { Constants } from "../../../config/constants";
import { RequestService as req } from "../../../services/requestService";
import actions from './actions';

const { fetchTagsAction, fetchTagAction, resetTagFormAction } = actions;

export const addTag = (data, action) => {
    return async dispatch => {
        await req.postRequest({ url: Constants.WEB_SETUP + 'tags', auth: 'bearer', body: data}, async (cb) => {
            await dispatch(fetchTags());
            await dispatch(action);
        })
    };
};

export const fetchTags = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.WEB_SETUP + 'tags',
            queries, auth: 'bearer'
        }, (cb) => dispatch(fetchTagsAction(cb)))
    };
};

export const updateTag = (data, action) => {
    return async dispatch => {
        await req.putRequest({ url: Constants.WEB_SETUP + 'tags/' + data._id, auth: 'bearer', body: data},  async (cb) => {
            await dispatch(fetchTags());
            await dispatch(action);
        })
    };
};

export const resetTagForm = () => dispatch => dispatch(resetTagFormAction());
export const fetchTag = (_id, action) => {
    return async dispatch => {
        await req.getRequest({ url: Constants.WEB_SETUP + 'tags/' + _id, auth: 'bearer'}, async (cb) => {
            await dispatch(fetchTagAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteTag = (id) => {
    return async dispatch => {
        await req.deleteRequest({ url: Constants.WEB_SETUP + 'tags/' + id, auth: 'bearer'}, (cb) => dispatch(fetchTags()))
    };
};
