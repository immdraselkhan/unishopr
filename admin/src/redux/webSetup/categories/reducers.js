import actions from "./actions";

const {FETCH_CATEGORY, FETCH_CATEGORIES, RESET_CATEGORY} = actions;
const initState = {
    categories: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    category: {_id: null}
};

const CategoryReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: data
            }
        case RESET_CATEGORY:
            return {
                ...state,
                category: initState.category,
            };
        case FETCH_CATEGORY:
            return {
                ...state,
                category: data,
            };
        default:
            return state;
    }
}

export default CategoryReducer;
