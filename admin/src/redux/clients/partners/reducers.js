import actions from "./actions";

const {FETCH_PARTNERS} = actions;
const initState = {
    partners: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
};

const PartnersReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_PARTNERS:
            return {
                ...state,
                partners: data
            }
        default:
            return state;
    }
}

export default PartnersReducer;
