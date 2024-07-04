import actions from "./actions";

const {FETCH_BRAND, FETCH_BRANDS, RESET_BRAND} = actions;
const initState = {
    brands: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    brand: {_id: null}
};

const BrandReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_BRANDS:
            return {
                ...state,
                brands: data
            }
        case RESET_BRAND:
            return {
                ...state,
                brand: initState.brand,
            };
        case FETCH_BRAND:
            return {
                ...state,
                brand: data,
            };
        default:
            return state;
    }
}

export default BrandReducer;
