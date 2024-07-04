import actions from './actions';

const {
    FETCH_USERS_STATS,
    FETCH_PURCHASES_STATS,
    FETCH_REVENUE_STATS,
} = actions;

const initState = {
    usersStats: {
        total: 0,
        percentage: 0,
        stats: []
    },
    purchasesStats: {
        total: 0,
        percentage: 0,
        stats: []
    },
    revenueStats: {
        total: 0,
        percentage: 0,
        stats: []
    },
};

const DashboardReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_USERS_STATS:
            return {
                ...state,
                usersStats: data,
            };
        case FETCH_PURCHASES_STATS:
            return {
                ...state,
                purchasesStats: data,
            };
        case FETCH_REVENUE_STATS:
            return {
                ...state,
                revenueStats: data,
            };
        default:
            return state;
    }
};

export default DashboardReducer;
