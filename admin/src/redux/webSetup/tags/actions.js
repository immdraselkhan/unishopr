const actions = {
    FETCH_TAGS  : 'FETCH_TAGS',
    FETCH_TAG   : 'FETCH_TAG',
    RESET_TAG   : 'RESET_TAG',

    fetchTagsAction: (data) => {
        return {
            type: actions.FETCH_TAGS,
            data: data
        };
    },
    resetTagFormAction: () => {
        return {
            type: actions.RESET_TAG,
            data: null
        };
    },
    fetchTagAction: (data) => {
        return {
            type: actions.FETCH_TAG,
            data: data
        };
    },
}

export default actions;
