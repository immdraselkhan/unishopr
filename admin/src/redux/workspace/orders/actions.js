const actions = {
    FETCH_ORDERS: 'FETCH_ORDERS',
    FETCH_ORDER: 'FETCH_ORDER',
    RESET_ORDER: 'RESET_ORDER',

    fetchOrdersAction: (data) => {
        return {
            type: actions.FETCH_ORDERS,
            data: data
        };
    },
    fetchOrderAction: (data) => {
        return {
            type: actions.FETCH_ORDER,
            data: data
        };
    },
    fetchOrderFormAction: (data) => {
        return {
            type: actions.RESET_ORDER,
            data: data
        };
    },
}

export default actions;
