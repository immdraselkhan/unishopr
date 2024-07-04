const actions = {
    FETCH_COUPONS: 'FETCH_COUPONS',
    FETCH_COUPON: 'FETCH_COUPON',
    RESET_COUPON: 'RESET_COUPON',

    fetchCouponsAction: (data) => {
        return {
            type: actions.FETCH_COUPONS,
            data: data
        };
    },
    resetCouponFormAction: () => {
        return {
            type: actions.RESET_COUPON,
            data: null
        };
    },
    fetchCouponAction: (data) => {
        return {
            type: actions.FETCH_COUPON,
            data: data
        };
    },
}

export default actions;
