import actions from "./actions";

const { FETCH_COUPON, FETCH_COUPONS, RESET_COUPON } = actions;
const initState = {
    coupons: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    coupon: { _id: null }
};

const CouponReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_COUPONS:
            return {
                ...state,
                coupons: data
            }
        case RESET_COUPON:
            return {
                ...state,
                coupon: initState.coupon,
            };
        case FETCH_COUPON:
            return {
                ...state,
                coupon: data,
            };
        default:
            return state;
    }
}

export default CouponReducer;
