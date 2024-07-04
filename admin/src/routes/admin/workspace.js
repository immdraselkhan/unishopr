import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Products = lazy(() => import('../../container/workspace/products/index'));
const Leads = lazy(() => import('../../container/workspace/leads'))
const Travels = lazy(() => import('../../container/workspace/travels'))
const Payments = lazy(() => import('../../container/workspace/payments/index'));
const Orders = lazy(() => import('../../container/workspace/orders/index'));
const Coupons = lazy(() => import('../../container/workspace/coupons/index'));

const WorkspaceRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/leads`} component={Leads} />
            <Route path={`${path}/travels`} component={Travels} />
            <Route path={`${path}/products`} component={Products} />
            <Route path={`${path}/payments`} component={Payments} />
            <Route path={`${path}/orders`} component={Orders} />
            <Route path={`${path}/coupons`} component={Coupons} />
        </Switch>
    );
};

export default WorkspaceRoutes;
