import actions from "./actions";

const {FETCH_TRAVELERS} = actions;
const initState = {
    travelers: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
};

const TravelersReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_TRAVELERS:
            return {
                ...state,
                travelers: data
            }
        default:
            return state;
    }
}

export default TravelersReducer;
