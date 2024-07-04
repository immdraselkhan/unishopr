import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Users = lazy(() => import('../../container/clients/users/index'));
const UserProfile = lazy(() => import('../../container/clients/users/profile'));
const Travelers = lazy(() => import('../../container/clients/travelers/index'));
const Partners = lazy(() => import('../../container/clients/partners/index'));

const ClientsRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/users`} component={Users}/>
            <Route path={`${path}/users-profile/:_id`} component={UserProfile}/>
            <Route path={`${path}/travelers`} component={Travelers}/>
            <Route path={`${path}/partners`} component={Partners}/>
        </Switch>
    );
};

export default ClientsRoutes;
