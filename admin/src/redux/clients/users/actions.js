const actions = {
    FETCH_USERS : 'FETCH_USERS',
    FETCH_USER_INFO : 'FETCH_USER_INFO',
    RESET_USER_INFO : 'RESET_USER_INFO',

    fetchUsersAction: (data) => {
        return {
            type: actions.FETCH_USERS,
            data: data
        };
    },
    resetUserFormAction: () => {
        return {
            type: actions.RESET_USER_INFO,
            data: null
        };
    },
    fetchUserInfoAction: (data) => {
        return {
            type: actions.FETCH_USER_INFO,
            data: data
        };
    }
}

export default actions;
