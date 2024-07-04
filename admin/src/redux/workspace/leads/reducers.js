import actions from "./actions";

const { FETCH_LEAD, FETCH_LEADS, RESET_LEAD } = actions;
const initState = {
    leads: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    lead: { _id: null }
};

const LeadReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_LEADS:
            return {
                ...state,
                leads: data
            }
        case RESET_LEAD:
            return {
                ...state,
                lead: initState.lead,
            };
        case FETCH_LEAD:
            return {
                ...state,
                lead: data,
            };
        default:
            return state;
    }
}

export default LeadReducer;
