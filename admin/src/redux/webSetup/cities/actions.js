const actions = {
    FETCH_CITIES    : 'FETCH_CITIES',
    FETCH_CITY      : 'FETCH_CITY',
    RESET_CITY      : 'RESET_CITY',

    fetchCitiesAction: (data) => {
        return {
            type: actions.FETCH_CITIES,
            data: data
        };
    },
    resetCityFormAction: () => {
        return {
            type: actions.RESET_CITY,
            data: null
        };
    },
    fetchCityAction: (data) => {
        return {
            type: actions.FETCH_CITY,
            data: data
        };
    },
}

export default actions;
