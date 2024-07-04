const actions = {
    FETCH_ROLES : 'FETCH_ROLES',
    FETCH_ROLE  : 'FETCH_ROLE',
    RESET_ROLE  : 'RESET_ROLE',

    fetchRolesAction: (data) => {
        return {
            type: actions.FETCH_ROLES,
            data: data
        };
    },
    resetRoleFormAction: () => {
        return {
            type: actions.RESET_ROLE,
            data: null
        };
    },
    fetchRoleAction: (data) => {
        return {
            type: actions.FETCH_ROLE,
            data: data
        };
    },
};

export default actions;
