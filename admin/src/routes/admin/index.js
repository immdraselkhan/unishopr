import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import DashboardRoutes from './dashboard';
import UserManagementRoutes from './userManagement';
import WebSetupRoutes from './webSetup';
import WorkspaceRoutes from './workspace';
import ClientRoutes from './clients';

import withAdminLayout from '../../layout/withAdminLayout';

const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Suspense
                fallback={
                    <div className="spin">
                        <Spin />
                    </div>
                }
            >
                <Route path={path} component={DashboardRoutes} />
                <Route path={`${path}/user-management`} component={UserManagementRoutes} />
                <Route path={`${path}/web-setup`} component={WebSetupRoutes} />
                <Route path={`${path}/workspace`} component={WorkspaceRoutes} />
                <Route path={`${path}/client`} component={ClientRoutes} />
            </Suspense>
        </Switch>
    );
};

export default withAdminLayout(Admin);
