const actions = {
    FETCH_CHILD_CATEGORIES    : 'FETCH_CHILD_CATEGORIES',
    FETCH_CHILD_CATEGORY      : 'FETCH_CHILD_CATEGORY',
    RESET_CHILD_CATEGORY      : 'RESET_CHILD_CATEGORY',

    fetchChildCategoriesAction: (data) => {
        return {
            type: actions.FETCH_CHILD_CATEGORIES,
            data: data
        };
    },
    resetChildCategoryFormAction: () => {
        return {
            type: actions.RESET_CHILD_CATEGORY,
            data: null
        };
    },
    fetchChildCategoryAction: (data) => {
        return {
            type: actions.FETCH_CHILD_CATEGORY,
            data: data
        };
    },
}

export default actions;
