import actions from './actions';
import { RequestService as req } from '../../services/requestService';
import { Constants } from '../../config/constants';

const {
    LoadingStart, LoadingEnd,
    fetchDepartmentsAction, fetchRolesAction, fetchLocationsAction, fetchCitiesAction, fetchCountriesAction,
    fetchCategoriesAction, fetchSubCategoriesAction, fetchChildCategoriesAction,
    fetchUsersAction, fetchUserAction, fetchTravelersAction, fetchPartnersAction,
    fetchTagsAction,
    fetchLeadAttributesAction,
    fetchLeadTimelinesAction,
    scrapeAction
} = actions;

const loadingStart = () => async dispatch => dispatch(LoadingStart());
const loadingEnd = () => async dispatch => dispatch(LoadingEnd());

const fetchRoles = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}roles`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchRolesAction(cb)))
    };
};

const fetchDepartments = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}departments`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchDepartmentsAction(cb)))
    };
};

const fetchCountries = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}countries`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCountriesAction(cb)))
    };
};

const fetchCities = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}cities`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCitiesAction(cb)))
    };
};

const fetchLocations = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}locations`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLocationsAction(cb)))
    };
};

const fetchCategories = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}categories`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchCategoriesAction(cb)))
    };
};

const fetchSubCategories = (categoryId) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}sub-categories/${categoryId}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchSubCategoriesAction(cb)))
    };
};

const fetchChildCategories = (subCategoryId) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}child-categories/${subCategoryId}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchChildCategoriesAction(cb)))
    };
};

const fetchTags = (queries) => {
    return async dispatch => {
        await req.getRequest({ url: Constants.UTILITIES + 'tags', queries: queries, auth: 'bearer'}, (cb) => dispatch(fetchTagsAction(cb)))
    };
};

const fetchUsers = (queries, action = null) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}users`,
            auth: 'bearer',
            queries
        }, async (cb) => {
            await dispatch(fetchUsersAction(cb))
            if (action) action(cb)
        })
    };
};

const fetchUser = (queries, action = null) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}user`,
            auth: 'bearer',
            queries
        }, async (cb) => {
            await dispatch(fetchUserAction(cb))
            if (action) action(cb)
        })
    };
};

const fetchTravelers = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}travelers`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTravelersAction(cb)))
    };
};

const fetchPartners = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}partners`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchPartnersAction(cb)))
    };
};

const fetchLeadAttributes = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}lead-attributes`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadAttributesAction(cb)))
    };
};

const fetchLeadTimelines = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}lead-timelines`,
            queries: queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadTimelinesAction(cb)))
    };
};

const scrape = (url) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.SCRAPING}scraping?url=${url}`,
        }, (cb) => dispatch(scrapeAction(cb)))
    };
};

export {
    loadingStart, loadingEnd,
    fetchDepartments, fetchRoles, fetchCountries, fetchCities, fetchLocations,
    fetchCategories, fetchSubCategories, fetchChildCategories, fetchTags,
    fetchUsers, fetchUser, fetchTravelers, fetchPartners,
    fetchLeadAttributes,
    fetchLeadTimelines,
    scrape,
};
