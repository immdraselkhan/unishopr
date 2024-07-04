import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchTeamsAction, fetchTeamAction, resetTeamFormAction } = actions;

export const addTeam = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.USER_MANAGEMENT}teams`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTeams({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const fetchTeams = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}teams`,
            queries,
            auth: 'bearer'
        },(cb) => dispatch(fetchTeamsAction(cb)))
    };
};

export const updateTeam = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.USER_MANAGEMENT}teams/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchTeams({page: 1, perPage: 10}));
            await dispatch(action);
        })
    };
};

export const resetTeamForm = () => dispatch => dispatch(resetTeamFormAction());
export const fetchTeam = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}teams/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchTeamAction(cb));
            await dispatch(action);
        })
    };
};

export const deleteTeam = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.USER_MANAGEMENT}teams/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTeams({page: 1, perPage: 10})))
    };
};
