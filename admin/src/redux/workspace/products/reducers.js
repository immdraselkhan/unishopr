import actions from "./actions";

const {FETCH_PRODUCT, FETCH_PRODUCTS, RESET_PRODUCT} = actions;
const initState = {
    products: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    product: {
        _id: null,
        facts: {isFeatured: false},
        preOrder: {isAllowed: false, limit: null},
        stock: {isAlert: false, alertQty: null, quantity: null},
    }
};

const ProductReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: data
            }
        case RESET_PRODUCT:
            return {
                ...state,
                product: initState.product,
            };
        case FETCH_PRODUCT:
            return {
                ...state,
                product: data,
            };
        default:
            return state;
    }
}

export default ProductReducer;
