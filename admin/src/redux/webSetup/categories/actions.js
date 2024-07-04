const actions = {
    FETCH_CATEGORIES : 'FETCH_CATEGORIES',
    FETCH_CATEGORY  : 'FETCH_CATEGORY',
    RESET_CATEGORY  : 'RESET_CATEGORY',

    fetchCategoriesAction: (data) => {
        return {
            type: actions.FETCH_CATEGORIES,
            data: data
        };
    },
    resetCategoryFormAction: () => {
        return {
            type: actions.RESET_CATEGORY,
            data: null
        };
    },
    fetchCategoryAction: (data) => {
        return {
            type: actions.FETCH_CATEGORY,
            data: data
        };
    },
}

export default actions;
