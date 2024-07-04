import actions from "./actions";

const {FETCH_SUB_CATEGORY, FETCH_SUB_CATEGORIES, RESET_SUB_CATEGORY} = actions;
const initState = {
    subCategories: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    subCategory: {_id: null, category: null, name: null, description: null, status: null}
};

const SubCategoryReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_SUB_CATEGORIES:
            return {
                ...state,
                subCategories: data
            }
        case RESET_SUB_CATEGORY:
            return {
                ...state,
                subCategory: initState.subCategory,
            };
        case FETCH_SUB_CATEGORY:
            return {
                ...state,
                subCategory: data,
            };
        default:
            return state;
    }
}

export default SubCategoryReducer;
