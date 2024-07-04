const actions = {
    FETCH_LEADS: 'FETCH_LEADS',
    FETCH_LEAD: 'FETCH_LEAD',
    RESET_LEAD: 'RESET_LEAD',

    fetchLeadsAction: (data) => {
        return {
            type: actions.FETCH_LEADS,
            data: data
        };
    },
    fetchLeadAction: (data) => {
        return {
            type: actions.FETCH_LEAD,
            data: data
        };
    },
    resetLeadAction: () => {
        return {
            type: actions.RESET_LEAD
        };
    }
}

export default actions;
