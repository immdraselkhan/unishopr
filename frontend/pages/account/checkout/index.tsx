import React from "react";
import Protected from "@components/layout/protected";
import AccountLayout from "@components/layout/account";
import Checkout from "@containers/account/checkout";

const CheckoutPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Checkout"}>
                <Checkout />
            </AccountLayout>
        </Protected>
    );
};

export default CheckoutPage;
