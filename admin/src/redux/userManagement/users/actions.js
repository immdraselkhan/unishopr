const actions = {
    FETCH_USERS : 'FETCH_USERS',
    FETCH_USER  : 'FETCH_USER',
    RESET_USER  : 'RESET_USER',

    fetchUsersAction: (data) => {
        return {
            type: actions.FETCH_USERS,
            data: data
        };
    },
    resetUserFormAction: () => {
        return {
            type: actions.RESET_USER,
            data: null
        };
    },
    fetchUserAction: (data) => {
        return {
            type: actions.FETCH_USER,
            data: data
        };
    },
}

export default actions;
