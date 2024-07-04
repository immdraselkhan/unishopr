const actions = {
    FETCH_TRAVELERS : 'FETCH_TRAVELERS',

    fetchTravelersAction: (data) => {
        return {
            type: actions.FETCH_TRAVELERS,
            data: data
        };
    },
}

export default actions;
