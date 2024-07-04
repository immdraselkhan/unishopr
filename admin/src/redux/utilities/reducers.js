import actions from './actions';

const {
    LOADING_START, LOADING_END,
    FETCH_UTILITIES_DEPARTMENTS, FETCH_UTILITIES_ROLES, FETCH_UTILITIES_LOCATIONS, FETCH_UTILITIES_CITIES, FETCH_UTILITIES_COUNTRIES, FETCH_UTILITIES_CATEGORIES,
    FETCH_UTILITIES_SUB_CATEGORIES, FETCH_UTILITIES_CHILD_CATEGORIES, FETCH_UTILITIES_TAGS,
    FETCH_UTILITIES_USERS, FETCH_UTILITIES_USER, FETCH_UTILITIES_TRAVELERS, FETCH_UTILITIES_PARTNERS,
    FETCH_UTILITIES_LEAD_ATTRIBUTES,
    FETCH_UTILITIES_LEAD_TIMELINES,
    SCRAPE
} = actions;

const initState = {
    loading: false,
    roles: [],
    departments: [],
    countries: [],
    cities: [],
    locations: [],
    categories: [],
    subCategories: [],
    childCategories: [],
    users: [],
    user: [],
    travelers: [],
    partners: [],
    tags: [],
    leadAttributes: [],
    leadTimelines: [],
    scrape: [],
};

const UtilitiesReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case LOADING_START:
            return {
                ...state,
                loading: true,
            };
        case LOADING_END:
            return {
                ...state,
                loading: false,
            };
        case FETCH_UTILITIES_ROLES:
            return {
                ...state,
                roles: data,
            };
        case FETCH_UTILITIES_DEPARTMENTS:
            return {
                ...state,
                departments: data,
            };
        case FETCH_UTILITIES_COUNTRIES:
            return {
                ...state,
                countries: data,
            };
        case FETCH_UTILITIES_CITIES:
            return {
                ...state,
                cities: data,
            };
        case FETCH_UTILITIES_LOCATIONS:
            return {
                ...state,
                locations: data,
            };
        case FETCH_UTILITIES_CATEGORIES:
            return {
                ...state,
                categories: data,
            };
        case FETCH_UTILITIES_SUB_CATEGORIES:
            return {
                ...state,
                subCategories: data,
            };
        case FETCH_UTILITIES_CHILD_CATEGORIES:
            return {
                ...state,
                childCategories: data,
            };
        case FETCH_UTILITIES_TAGS:
            return {
                ...state,
                tags: data,
            };
        case FETCH_UTILITIES_USERS:
            return {
                ...state,
                users: data,
            };
        case FETCH_UTILITIES_USER:
            return {
                ...state,
                user: data,
            };
        case FETCH_UTILITIES_TRAVELERS:
            return {
                ...state,
                travelers: data,
            };
        case FETCH_UTILITIES_PARTNERS:
            return {
                ...state,
                partners: data,
            };
        case FETCH_UTILITIES_LEAD_ATTRIBUTES:
            return {
                ...state,
                leadAttributes: data,
            };
        case FETCH_UTILITIES_LEAD_TIMELINES:
            return {
                ...state,
                leadTimelines: data,
            };
        case SCRAPE:
            return {
                ...state,
                scrape: data,
            };
        default:
            return state;
    }
};
export default UtilitiesReducer;
