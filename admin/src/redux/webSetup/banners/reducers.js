import actions from "./actions";

const {FETCH_BANNER, FETCH_BANNERS, RESET_BANNER} = actions;
const initState = {
    banners: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    banner: {
        id: null,
        name: null,
        status: null,
        url: null,
        photo: null,
        description: null
    }
};

const BannerReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_BANNERS:
            return {
                ...state,
                banners: data
            }
        case RESET_BANNER:
            return {
                ...state,
                banner: initState.banner,
            };
        case FETCH_BANNER:
            return {
                ...state,
                banner: data,
            };
        default:
            return state;
    }
}

export default BannerReducer;
