import actions from "./actions";

const {FETCH_DEPARTMENT, FETCH_DEPARTMENTS, RESET_DEPARTMENT} = actions;
const initState = {
    departments: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    department: {_id: null}
};

const DepartmentReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_DEPARTMENTS:
            return {
                ...state,
                departments: data
            }
        case RESET_DEPARTMENT:
            return {
                ...state,
                department: initState.department,
            };
        case FETCH_DEPARTMENT:
            return {
                ...state,
                department: data,
            };
        default:
            return state;
    }
}

export default DepartmentReducer;
