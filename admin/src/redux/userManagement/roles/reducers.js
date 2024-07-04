import actions from './actions';

const { FETCH_ROLES, FETCH_ROLE, RESET_ROLE } = actions;
const initState = {
    roles: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    role: {_id: null}
};

const RoleReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_ROLES:
            return {
                ...state,
                roles: data,
            };
        case RESET_ROLE:
            return {
                ...state,
                role: initState.role,
            };
        case FETCH_ROLE:
            return {
                ...state,
                role: data,
            };
        default:
            return state;
    }
};

export default RoleReducer;
