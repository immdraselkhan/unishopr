import actions from "./actions";

const {FETCH_TEAMS, FETCH_TEAM, RESET_TEAM} = actions;
const initState = {
    teams: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    team: {_id: null}
};

const TeamReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_TEAMS:
            return {
                ...state,
                teams: data
            }
        case RESET_TEAM:
            return {
                ...state,
                team: initState.team,
            };
        case FETCH_TEAM:
            return {
                ...state,
                team: data,
            };
        default:
            return state;
    }
}

export default TeamReducer;
