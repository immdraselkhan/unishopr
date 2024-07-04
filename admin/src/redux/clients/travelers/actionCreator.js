import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchTravelersAction } = actions;

export const fetchTravelers = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.CLIENTS + 'travelers',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTravelersAction(cb)))
    };
};

export const approveRequest = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.CLIENTS + 'travelers/approve',
            auth: 'bearer',
            body: data
        }, async (cb) => dispatch(fetchTravelers({page: 1, perPage: 10})))
    };
};
