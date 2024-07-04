import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchLeadTimelineAction, fetchLeadTimelinesAction, resetLeadTimelineFormAction } = actions;

export const addLeadTimeline = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WEB_SETUP}lead-timelines`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchLeadTimelines({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchLeadTimelines = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}lead-timelines`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadTimelinesAction(cb)))
    };
};

export const updateLeadTimeline = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WEB_SETUP}lead-timelines/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchLeadTimelines({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetLeadTimelineForm = () => dispatch => dispatch(resetLeadTimelineFormAction());
export const fetchLeadTimeline = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WEB_SETUP}lead-timelines/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchLeadTimelineAction(cb));
            if (action) await action();
        })
    };
};

export const deleteLeadTimeline = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.WEB_SETUP}lead-timelines/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadTimelines({page: 1, perPage: 10})))
    };
};
