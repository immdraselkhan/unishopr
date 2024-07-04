const actions = {
    FETCH_LEAD_TIMELINES : 'FETCH_LEAD_TIMELINES',
    FETCH_LEAD_TIMELINE  : 'FETCH_LEAD_TIMELINE',
    RESET_LEAD_TIMELINE  : 'RESET_LEAD_TIMELINE',

    fetchLeadTimelinesAction: (data) => {
        return {
            type: actions.FETCH_LEAD_TIMELINES,
            data: data
        };
    },
    resetLeadTimelineFormAction: () => {
        return {
            type: actions.RESET_LEAD_TIMELINE,
            data: null
        };
    },
    fetchLeadTimelineAction: (data) => {
        return {
            type: actions.FETCH_LEAD_TIMELINE,
            data: data
        };
    },
}

export default actions;
