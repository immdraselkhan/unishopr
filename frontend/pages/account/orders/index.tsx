import React from "react";
import Orders from "@containers/account/orders";
import Protected from "@components/layout/protected";
import OrdersNav from "@components/layout/orders-nav";
import AccountLayout from "@components/layout/account";

const OrdersPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Orders"} nav={<OrdersNav />}>
                <Orders />
            </AccountLayout>
        </Protected>
    );
};

export default OrdersPage;
