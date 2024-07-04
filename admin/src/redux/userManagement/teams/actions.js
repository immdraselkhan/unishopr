const actions = {
    FETCH_TEAMS : 'FETCH_TEAMS',
    FETCH_TEAM  : 'FETCH_TEAM',
    RESET_TEAM  : 'RESET_TEAM',

    fetchTeamsAction: (data) => {
        return {
            type: actions.FETCH_TEAMS,
            data: data
        };
    },
    resetTeamFormAction: () => {
        return {
            type: actions.RESET_TEAM,
            data: {_id: null}
        };
    },
    fetchTeamAction: (data) => {
        return {
            type: actions.FETCH_TEAM,
            data: data
        };
    },
}

export default actions;
