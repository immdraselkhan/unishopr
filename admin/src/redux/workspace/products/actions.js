const actions = {
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    FETCH_PRODUCT: 'FETCH_PRODUCT',
    RESET_PRODUCT: 'RESET_PRODUCT',

    fetchProductsAction: (data) => {
        return {
            type: actions.FETCH_PRODUCTS,
            data: data
        };
    },
    fetchProductAction: (data) => {
        return {
            type: actions.FETCH_PRODUCT,
            data: data
        };
    },
    resetProductFormAction: () => {
        return {
            type: actions.RESET_PRODUCT,
            data: null
        };
    },
}

export default actions;
