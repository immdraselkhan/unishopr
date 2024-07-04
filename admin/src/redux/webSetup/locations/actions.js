const actions = {
    FETCH_LOCATIONS     : 'FETCH_LOCATIONS',
    FETCH_LOCATION      : 'FETCH_LOCATION',
    RESET_LOCATION      : 'RESET_LOCATION',

    fetchLocationsAction: (data) => {
        return {
            type: actions.FETCH_LOCATIONS,
            data: data
        };
    },
    resetLocationFormAction: () => {
        return {
            type: actions.RESET_LOCATION,
            data: null
        };
    },
    fetchLocationAction: (data) => {
        return {
            type: actions.FETCH_LOCATION,
            data: data
        };
    },
}

export default actions;
