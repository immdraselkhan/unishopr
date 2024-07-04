import actions from "./actions";

const {FETCH_ORDERS, FETCH_ORDER, RESET_ORDER} = actions;
const initState = {
    orders: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    order: {_id: null}
};

const OrdersReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_ORDERS:
            return {
                ...state,
                orders: data
            }
        case FETCH_ORDER:
            return {
                ...state,
                order: data
            }
        case RESET_ORDER:
            return {
                ...state,
                order: initState.order
            }
        default:
            return state;
    }
}

export default OrdersReducer;
