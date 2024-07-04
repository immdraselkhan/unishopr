const actions = {
    FETCH_PARTNERS : 'FETCH_PARTNERS',

    fetchPartnersAction: (data) => {
        return {
            type: actions.FETCH_PARTNERS,
            data: data
        };
    },
}

export default actions;
