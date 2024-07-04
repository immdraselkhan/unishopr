import actions from "./actions";

const {FETCH_LOCATION, FETCH_LOCATIONS, RESET_LOCATION} = actions;
const initState = {
    locations: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    location: {_id: null, country: null, city: null, name: null, status: null, latitude: null, longitude: null}
};

const LocationReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                locations: data
            }
        case RESET_LOCATION:
            return {
                ...state,
                location: initState.location,
            };
        case FETCH_LOCATION:
            return {
                ...state,
                location: data,
            };
        default:
            return state;
    }
}

export default LocationReducer;
