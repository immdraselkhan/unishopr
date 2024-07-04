import React from "react";
import Protected from "@components/layout/protected";
import OrdersNav from "@components/layout/orders-nav";
import AccountLayout from "@components/layout/account";
import Cancelled from "@containers/account/orders/cancelled";

const CancelledPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Cancelled"} nav={<OrdersNav />}>
                <Cancelled />
            </AccountLayout>
        </Protected>
    );
};

export default CancelledPage;
