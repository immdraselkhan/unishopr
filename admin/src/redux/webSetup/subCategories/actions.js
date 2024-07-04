const actions = {
    FETCH_SUB_CATEGORIES    : 'FETCH_SUB_CATEGORIES',
    FETCH_SUB_CATEGORY      : 'FETCH_SUB_CATEGORY',
    RESET_SUB_CATEGORY      : 'RESET_SUB_CATEGORY',

    fetchSubCategoriesAction: (data) => {
        return {
            type: actions.FETCH_SUB_CATEGORIES,
            data: data
        };
    },
    resetSubCategoryFormAction: () => {
        return {
            type: actions.RESET_SUB_CATEGORY,
            data: null
        };
    },
    fetchSubCategoryAction: (data) => {
        return {
            type: actions.FETCH_SUB_CATEGORY,
            data: data
        };
    },
}

export default actions;
