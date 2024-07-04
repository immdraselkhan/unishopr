import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Categories = lazy(() => import('../../container/webSetup/categories/index'));
const SubCategories = lazy(() => import('../../container/webSetup/subCategories/index'));
const ChildCategories = lazy(() => import('../../container/webSetup/childCategories/index'));
const Countries = lazy(() => import('../../container/webSetup/countries/index'));
const Cities = lazy(() => import('../../container/webSetup/cities/index'));
const Locations = lazy(() => import('../../container/webSetup/locations/index'));
const Tags = lazy(() => import('../../container/webSetup/tags/index'));
const Brands = lazy(() => import('../../container/webSetup/brands/index'));
const LeadAttributes = lazy(() => import('../../container/webSetup/leadAttributes/index'));
const LeadTimelines = lazy(() => import('../../container/webSetup/leadTimelines/index'));
const Banners = lazy(() => import('../../container/webSetup/banners/index'));

const UserManagementRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/categories`} component={Categories}/>
            <Route path={`${path}/sub-categories`} component={SubCategories}/>
            <Route path={`${path}/child-categories`} component={ChildCategories}/>
            <Route path={`${path}/countries`} component={Countries}/>
            <Route path={`${path}/cities`} component={Cities}/>
            <Route path={`${path}/locations`} component={Locations}/>
            <Route path={`${path}/tags`} component={Tags}/>
            <Route path={`${path}/brands`} component={Brands}/>
            <Route path={`${path}/lead-attributes`} component={LeadAttributes}/>
            <Route path={`${path}/lead-timelines`} component={LeadTimelines}/>
            <Route path={`${path}/banners`} component={Banners}/>
        </Switch>
    );
};

export default UserManagementRoutes;
