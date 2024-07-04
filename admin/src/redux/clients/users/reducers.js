import actions from "./actions";

const {FETCH_USERS, FETCH_USER_INFO, RESET_USER_INFO} = actions;
const initState = {
    users: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    userInfo: null,
    userPayments: [],
    userOrders: [],
    travelerTravels: [],
};

const UsersReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_USERS:
            return {
                ...state,
                users: data
            }
        case FETCH_USER_INFO:
            return {
                ...state,
                userInfo: data.userInfo,
                userPayments: data.userPayments,
                userOrders: data.userOrders,
                travelerTravels: data.travelerTravels
            }
        case RESET_USER_INFO:
            return {
                ...state,
                userInfo: null
            }
        default:
            return state;
    }
}

export default UsersReducer;
