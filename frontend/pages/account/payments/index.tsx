import React, {Fragment} from "react";
import Protected from "@components/layout/protected";
import Payments from "@containers/account/payments";
import AccountLayout from "@components/layout/account";

const TravelsPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"My Payments"}>
                <Payments />
            </AccountLayout>
        </Protected>
    );
};

export default TravelsPage;