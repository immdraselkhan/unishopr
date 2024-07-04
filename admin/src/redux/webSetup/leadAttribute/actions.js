const actions = {
    FETCH_LEAD_ATTRIBUTES : 'FETCH_LEAD_ATTRIBUTES',
    FETCH_LEAD_ATTRIBUTE  : 'FETCH_LEAD_ATTRIBUTE',
    RESET_LEAD_ATTRIBUTE  : 'RESET_LEAD_ATTRIBUTE',

    fetchLeadAttributesAction: (data) => {
        return {
            type: actions.FETCH_LEAD_ATTRIBUTES,
            data: data
        };
    },
    resetLeadAttributeFormAction: () => {
        return {
            type: actions.RESET_LEAD_ATTRIBUTE,
            data: null
        };
    },
    fetchLeadAttributeAction: (data) => {
        return {
            type: actions.FETCH_LEAD_ATTRIBUTE,
            data: data
        };
    },
}

export default actions;
