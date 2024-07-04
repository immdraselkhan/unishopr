import actions from "./actions";

const { FETCH_TRAVEL, FETCH_TRAVELS, RESET_TRAVEL, FETCH_TRAVEL_LEADS, FETCH_TRAVEL_RESOLVE } = actions;
const initState = {
    travels: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    travel: { _id: null },
    travelLeads: []
};

const DepartmentReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_TRAVELS:
            return {
                ...state,
                travels: data
            }
        case RESET_TRAVEL:
            return {
                ...state,
                travel: initState.travel,
            };
        case FETCH_TRAVEL:
            return {
                ...state,
                travel: data,
            };
        case FETCH_TRAVEL_LEADS:
            return {
                ...state,
                travelLeads: data,
            };
        case FETCH_TRAVEL_RESOLVE:
            return {
                ...state,
                travel: data
            }
        default:
            return state;
    }
}

export default DepartmentReducer;
