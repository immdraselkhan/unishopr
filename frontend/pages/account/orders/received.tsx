import React from "react";
import Protected from "@components/layout/protected";
import OrdersNav from "@components/layout/orders-nav";
import AccountLayout from "@components/layout/account";
import Received from "@containers/account/orders/received";

const ReceivedPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Received"} nav={<OrdersNav />}>
                <Received />
            </AccountLayout>
        </Protected>
    );
};

export default ReceivedPage;
