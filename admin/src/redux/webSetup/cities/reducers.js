import actions from "./actions";

const {FETCH_CITY, FETCH_CITIES, RESET_CITY} = actions;
const initState = {
    cities: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    city: {_id: null, country: null, name: null, status: null, latitude: null, longitude: null}
};

const CityReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_CITIES:
            return {
                ...state,
                cities: data
            }
        case RESET_CITY:
            return {
                ...state,
                city: initState.city,
            };
        case FETCH_CITY:
            return {
                ...state,
                city: data,
            };
        default:
            return state;
    }
}

export default CityReducer;
