import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchPartnersAction } = actions;

export const fetchPartners = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: Constants.CLIENTS + 'partners',
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchPartnersAction(cb)))
    };
};

export const approveRequest = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.CLIENTS + 'partners/approve',
            auth: 'bearer',
            body: data
        }, async (cb) => dispatch(fetchPartners({page: 1, perPage: 10})))
    };
};
