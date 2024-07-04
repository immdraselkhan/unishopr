import actions from "./actions";

const {FETCH_CHILD_CATEGORY, FETCH_CHILD_CATEGORIES, RESET_CHILD_CATEGORY} = actions;
const initState = {
    childCategories: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    childCategory: {_id: null, category: null, name: null, description: null, status: null}
};

const ChildCategoryReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_CHILD_CATEGORIES:
            return {
                ...state,
                childCategories: data
            }
        case RESET_CHILD_CATEGORY:
            return {
                ...state,
                childCategory: initState.childCategory,
            };
        case FETCH_CHILD_CATEGORY:
            return {
                ...state,
                childCategory: data,
            };
        default:
            return state;
    }
}

export default ChildCategoryReducer;
