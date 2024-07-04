const actions = {
    FETCH_TRAVELS: 'FETCH_TRAVELS',
    FETCH_TRAVEL: 'FETCH_TRAVEL',
    RESET_TRAVEL: 'RESET_TRAVEL',
    FETCH_TRAVEL_LEADS: 'FETCH_TRAVEL_LEADS',
    FETCH_TRAVEL_RESOLVE: 'FETCH_TRAVEL_RESOLVE',

    fetchTravelsAction: (data) => {
        return {
            type: actions.FETCH_TRAVELS,
            data: data
        };
    },
    resetTravelFormAction: () => {
        return {
            type: actions.RESET_TRAVEL,
            data: null
        };
    },
    fetchTravelAction: (data) => {
        return {
            type: actions.FETCH_TRAVEL,
            data: data
        };
    },
    fetchTravelLeadsAction: (data) => {
        return {
            type: actions.FETCH_TRAVEL_LEADS,
            data: data
        };
    },
    fetchResolveTravelAction: (data) => {
        return {
            type: actions.FETCH_TRAVEL_RESOLVE,
            data: data
        };
    },
}

export default actions;
