import { combineReducers } from 'redux';

import authReducer from './authentication/reducers';
import utilitiesReducer from './utilities/reducers';
import dashboardReducer from './dashboard/reducers';

import roleReducer from './userManagement/roles/reducers';
import userReducer from './userManagement/users/reducers';
import departmentReducer from './userManagement/departments/reducers';
import teamReducer from './userManagement/teams/reducers';

import categoryReducer from './webSetup/categories/reducers'
import subCategoryReducer from './webSetup/subCategories/reducers'
import childCategoryReducer from './webSetup/childCategories/reducers'
import countriesReducer from './webSetup/countries/reducers'
import citiesReducer from './webSetup/cities/reducers'
import locationsReducer from './webSetup/locations/reducers'
import tagReducer from './webSetup/tags/reducers'
import brandsReducer from './webSetup/brands/reducers'
import leadAttributesReduces from './webSetup/leadAttribute/reducers'
import leadTimelinesReduces from './webSetup/leadTimeline/reducers'
import bannersReducer from './webSetup/banners/reducers'

import productsReducer from './workspace/products/reducers'
import paymentsReducer from './workspace/payments/reducers'
import ordersReducer from './workspace/orders/reducers'
import leadReducer from './workspace/leads/reducers'
import travelReducer from './workspace/travels/reducers'
import couponsReducer from './workspace/coupons/reducers'

import clientsUsersReducer from './clients/users/reducers';
import clientsTravelersReducer from './clients/travelers/reducers';
import clientsPartnersReducer from './clients/partners/reducers';

import ChangeLayoutMode from './themeLayout/reducers';

const rootReducers = combineReducers({
    auth: authReducer,
    utilities: utilitiesReducer,
    dashboard: dashboardReducer,

    umRoles: roleReducer,
    umUsers: userReducer,
    umDepartments: departmentReducer,
    umTeams: teamReducer,

    wsCategories: categoryReducer,
    wsSubCategories: subCategoryReducer,
    wsChildCategories: childCategoryReducer,
    wsCountries: countriesReducer,
    wsCities: citiesReducer,
    wsLocations: locationsReducer,
    wsTags: tagReducer,
    wsBrands: brandsReducer,
    wsLeadAttributes: leadAttributesReduces,
    wsLeadTimelines: leadTimelinesReduces,
    wsBanners: bannersReducer,

    workspaceLeads: leadReducer,
    workspaceTravels: travelReducer,
    workspaceProducts: productsReducer,
    workspacePayments: paymentsReducer,
    workspaceOrders: ordersReducer,
    workspaceCoupons: couponsReducer,

    clientsUsers: clientsUsersReducer,
    clientsTravelers: clientsTravelersReducer,
    clientsPartners: clientsPartnersReducer,

    ChangeLayoutMode,
});

export default rootReducers;
