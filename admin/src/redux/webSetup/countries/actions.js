const actions = {
    FETCH_COUNTRIES     : 'FETCH_COUNTRIES',
    FETCH_COUNTRY       : 'FETCH_COUNTRY',
    RESET_COUNTRY      : 'RESET_COUNTRY',

    fetchCountriesAction: (data) => {
        return {
            type: actions.FETCH_COUNTRIES,
            data: data
        };
    },
    resetCountryFormAction: () => {
        return {
            type: actions.RESET_COUNTRY,
            data: null
        };
    },
    fetchCountryAction: (data) => {
        return {
            type: actions.FETCH_COUNTRY,
            data: data
        };
    },
}

export default actions;
