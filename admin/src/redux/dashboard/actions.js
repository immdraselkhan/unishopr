const actions = {
    FETCH_USERS_STATS : 'FETCH_USERS_STATS',
    FETCH_PURCHASES_STATS : 'FETCH_PURCHASES_STATS',
    FETCH_REVENUE_STATS : 'FETCH_REVENUE_STATS',

    fetchUsersStatsAction: (data) => {
        return {
            type: actions.FETCH_USERS_STATS,
            data: data
        };
    },
    fetchPurchasesStatsAction: (data) => {
        return {
            type: actions.FETCH_PURCHASES_STATS,
            data: data
        };
    },
    fetchRevenueStatsAction: (data) => {
        return {
            type: actions.FETCH_REVENUE_STATS,
            data: data
        };
    },
};

export default actions;
