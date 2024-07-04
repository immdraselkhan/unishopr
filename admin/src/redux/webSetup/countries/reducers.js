import actions from "./actions";

const {FETCH_COUNTRY, FETCH_COUNTRIES, RESET_COUNTRY} = actions;
const initState = {
    countries: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    country: {_id: null, code: null, name: null, status: null, latitude: null, longitude: null}
};

const CategoryReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                countries: data
            }
        case RESET_COUNTRY:
            return {
                ...state,
                country: initState.country,
            };
        case FETCH_COUNTRY:
            return {
                ...state,
                country: data,
            };
        default:
            return state;
    }
}

export default CategoryReducer;
