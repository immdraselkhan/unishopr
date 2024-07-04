const actions = {
    FETCH_DEPARTMENTS : 'FETCH_DEPARTMENTS',
    FETCH_DEPARTMENT  : 'FETCH_DEPARTMENT',
    RESET_DEPARTMENT  : 'RESET_DEPARTMENT',

    fetchDepartmentsAction: (data) => {
        return {
            type: actions.FETCH_DEPARTMENTS,
            data: data
        };
    },
    resetDepartmentFormAction: () => {
        return {
            type: actions.RESET_DEPARTMENT,
            data: null
        };
    },
    fetchDepartmentAction: (data) => {
        return {
            type: actions.FETCH_DEPARTMENT,
            data: data
        };
    },
}

export default actions;
