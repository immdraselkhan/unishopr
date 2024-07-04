import React from "react";
import Protected from "@components/layout/protected";
import OrdersNav from "@components/layout/orders-nav";
import AccountLayout from "@components/layout/account";
import InTransit from "@containers/account/orders/in-transit";

const InTransitPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"In Transit"} nav={<OrdersNav />}>
                <InTransit />
            </AccountLayout>
        </Protected>
    );
};

export default InTransitPage;
