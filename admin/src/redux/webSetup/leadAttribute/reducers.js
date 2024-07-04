import actions from "./actions";

const {FETCH_LEAD_ATTRIBUTE, FETCH_LEAD_ATTRIBUTES, RESET_LEAD_ATTRIBUTE} = actions;
const initState = {
    leadAttributes: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    leadAttribute: {_id: null}
};

const LeadAttributeReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_LEAD_ATTRIBUTES:
            return {
                ...state,
                leadAttributes: data
            }
        case RESET_LEAD_ATTRIBUTE:
            return {
                ...state,
                leadAttribute: initState.leadAttribute,
            };
        case FETCH_LEAD_ATTRIBUTE:
            return {
                ...state,
                leadAttribute: data,
            };
        default:
            return state;
    }
}

export default LeadAttributeReducer;
