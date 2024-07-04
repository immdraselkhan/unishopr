const actions = {
    FETCH_BANNERS  : 'FETCH_BANNERS',
    FETCH_BANNER   : 'FETCH_BANNER',
    RESET_BANNER   : 'RESET_BANNER',

    fetchBannersAction: (data) => {
        return {
            type: actions.FETCH_BANNERS,
            data: data
        };
    },
    resetBannerFormAction: () => {
        return {
            type: actions.RESET_BANNER,
            data: null
        };
    },
    fetchBannerAction: (data) => {
        return {
            type: actions.FETCH_BANNER,
            data: data
        };
    },
}

export default actions;
