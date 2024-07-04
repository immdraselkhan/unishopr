const actions = {
    LOADING_START       : 'LOADING_START',
    LOADING_END         : 'LOADING_END',
    FETCH_UTILITIES_ROLES       : 'FETCH_UTILITIES_ROLES',
    FETCH_UTILITIES_DEPARTMENTS : 'FETCH_UTILITIES_DEPARTMENTS',
    FETCH_UTILITIES_COUNTRIES   : 'FETCH_UTILITIES_COUNTRIES',
    FETCH_UTILITIES_CITIES      : 'FETCH_UTILITIES_CITIES',
    FETCH_UTILITIES_LOCATIONS   : 'FETCH_UTILITIES_LOCATIONS',
    FETCH_UTILITIES_CATEGORIES  : 'FETCH_UTILITIES_CATEGORIES',
    FETCH_UTILITIES_SUB_CATEGORIES      : 'FETCH_UTILITIES_SUB_CATEGORIES',
    FETCH_UTILITIES_CHILD_CATEGORIES    : 'FETCH_UTILITIES_CHILD_CATEGORIES',
    FETCH_UTILITIES_USERS : 'FETCH_UTILITIES_USERS',
    FETCH_UTILITIES_USER : 'FETCH_UTILITIES_USER',
    FETCH_UTILITIES_TRAVELERS : 'FETCH_UTILITIES_TRAVELERS',
    FETCH_UTILITIES_PARTNERS : 'FETCH_UTILITIES_PARTNERS',
    FETCH_UTILITIES_TAGS        : 'FETCH_UTILITIES_TAGS',
    FETCH_UTILITIES_LEAD_ATTRIBUTES : 'FETCH_UTILITIES_LEAD_ATTRIBUTES',
    FETCH_UTILITIES_LEAD_TIMELINES : 'FETCH_UTILITIES_LEAD_TIMELINES',
    SCRAPE : 'SCRAPE',

    LoadingStart: () => {
        return {
            type: actions.LOADING_START,
        };
    },
    LoadingEnd: data => {
        return {
            type: actions.LOADING_END
        };
    },
    fetchRolesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_ROLES,
            data: data
        };
    },
    fetchDepartmentsAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_DEPARTMENTS,
            data: data
        };
    },
    fetchCountriesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_COUNTRIES,
            data: data
        }
    },
    fetchCitiesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_CITIES,
            data: data
        }
    },
    fetchLocationsAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_LOCATIONS,
            data: data
        }
    },
    fetchCategoriesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_CATEGORIES,
            data: data
        }
    },
    fetchSubCategoriesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_SUB_CATEGORIES,
            data: data
        }
    },
    fetchChildCategoriesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_CHILD_CATEGORIES,
            data: data
        }
    },
    fetchTagsAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_TAGS,
            data: data
        }
    },
    fetchUsersAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_USERS,
            data: data
        };
    },
    fetchUserAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_USER,
            data: data
        };
    },
    fetchTravelersAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_TRAVELERS,
            data: data
        }
    },
    fetchPartnersAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_PARTNERS,
            data: data
        }
    },
    fetchLeadAttributesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_LEAD_ATTRIBUTES,
            data: data
        }
    },
    fetchLeadTimelinesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_LEAD_TIMELINES,
            data: data
        }
    },
    scrapeAction: (data) => {
        return {
            type: actions.SCRAPE,
            data: data
        }
    }
};

export default actions;
