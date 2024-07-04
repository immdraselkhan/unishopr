import actions from './actions'
import { RequestService as req } from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchTravelAction, fetchTravelsAction, resetTravelFormAction, fetchTravelLeadsAction } = actions;

export const addTravel = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WORKSPACE}travels`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTravels({ page: 1, perPage: 10 }));
            if (action) await action();
        })
    };
};

export const fetchTravels = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}travels`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTravelsAction(cb)))
    };
};

export const updateTravel = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WORKSPACE}travels/${data._id}`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTravels({ page: 1, perPage: 10 }));
            if (action) await action();
        })
    };
};

export const resetTravelForm = () => dispatch => dispatch(resetTravelFormAction());
export const fetchTravel = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}travels/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchTravelAction(cb));
            if (action) await action(cb);
        })
    };
};

export const deleteTravel = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.WORKSPACE}travels/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTravels({ page: 1, perPage: 10 })))
    };
};

export const fetchTravelLeads = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}travels/leads/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchTravelLeadsAction(cb));
            if (action) action()
        })
    };
};

export const addTravelLead = (data) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WORKSPACE}travels/leads/${data.travelId}`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTravel(data.travelId))
            await dispatch(fetchTravelLeads(data.travelId))
        })
    };
};

export const travelResolve = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WORKSPACE}travel/resolve/${data._id}`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTravels({page: 1, perPage: 10}));
            await dispatch(fetchTravel(data._id))
            if (action) await action();
        })
    };
};