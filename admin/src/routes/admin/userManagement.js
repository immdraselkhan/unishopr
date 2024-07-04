import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Roles = lazy(() => import('../../container/userManagement/roles/index'));
const RolesPermissions = lazy(() => import('../../container/userManagement/rolesPermissions'));
const Users = lazy(() => import('../../container/userManagement/users/index'));
const departments = lazy(() => import('../../container/userManagement/departments'))
const teams = lazy(() => import('../../container/userManagement/teams'))

const UserManagementRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/roles`} component={Roles}/>
            <Route path={`${path}/roles-permissions`} component={RolesPermissions}/>
            <Route path={`${path}/users`} component={Users}/>
            <Route path={`${path}/departments`} component={departments}/>
            <Route path={`${path}/teams`} component={teams}/>
        </Switch>
    );
};

export default UserManagementRoutes;
