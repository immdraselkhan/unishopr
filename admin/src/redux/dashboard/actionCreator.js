import actions from './actions';
import {RequestService as req} from '../../services/requestService';
import { Constants } from '../../config/constants';

const {
    fetchUsersStatsAction,
    fetchPurchasesStatsAction,
    fetchRevenueStatsAction,
} = actions;

export const fetchUsersStats = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.DASHBOARD}users-stats`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchUsersStatsAction(cb)))
    };
};

export const fetchPurchasesStats = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.DASHBOARD}purchases-stats`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchPurchasesStatsAction(cb)))
    };
};

export const fetchRevenueStats = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.DASHBOARD}revenue-stats`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchRevenueStatsAction(cb)))
    };
};
