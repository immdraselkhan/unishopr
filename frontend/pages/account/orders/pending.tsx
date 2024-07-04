import React from "react";
import Pending from "@containers/account/orders/pending";
import Protected from "@components/layout/protected";
import AccountLayout from "@components/layout/account";
import OrdersNav from "@components/layout/orders-nav";

const PendingPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Requests"} nav={<OrdersNav />}>
                <Pending />
            </AccountLayout>
        </Protected>
    );
};

export default PendingPage;
