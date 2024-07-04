import actions from './actions';

const {FETCH_USER, FETCH_USERS, RESET_USER} = actions;
const initState = {
    users: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    user: null
};

const UserReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_USERS:
            return {
                ...state,
                users: data,
            };
        case RESET_USER:
            return {
                ...state,
                user: initState.user
            };
        case FETCH_USER: {
            return {
                ...state,
                user: data
            }
        }
        default:
            return state;
    }
};

export default UserReducer;
