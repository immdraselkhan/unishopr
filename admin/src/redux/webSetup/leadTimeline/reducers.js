import actions from "./actions";

const {FETCH_LEAD_TIMELINE, FETCH_LEAD_TIMELINES, RESET_LEAD_TIMELINE} = actions;
const initState = {
    leadTimelines: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    leadTimeline: {_id: null}
};

const LeadTimelineReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_LEAD_TIMELINES:
            return {
                ...state,
                leadTimelines: data
            }
        case RESET_LEAD_TIMELINE:
            return {
                ...state,
                leadTimeline: initState.leadTimeline,
            };
        case FETCH_LEAD_TIMELINE:
            return {
                ...state,
                leadTimeline: data,
            };
        default:
            return state;
    }
}

export default LeadTimelineReducer;
