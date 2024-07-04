const actions = {
    FETCH_BRANDS    : 'FETCH_BRANDS',
    FETCH_BRAND      : 'FETCH_BRAND',
    RESET_BRAND      : 'RESET_BRAND',

    fetchBrandsAction: (data) => {
        return {
            type: actions.FETCH_BRANDS,
            data: data
        };
    },
    resetBrandFormAction: () => {
        return {
            type: actions.RESET_BRAND,
            data: {_id: null}
        };
    },
    fetchBrandAction: (data) => {
        return {
            type: actions.FETCH_BRAND,
            data: data
        };
    },
}

export default actions;
