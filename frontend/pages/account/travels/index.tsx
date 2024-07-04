import React, {Fragment} from "react";
import Protected from "@components/layout/protected";
import Travels from "@containers/account/travels";
import AccountLayout from "@components/layout/account";

const TravelsPage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"My Travels"}>
                <Travels />
            </AccountLayout>
        </Protected>
    );
};

export default TravelsPage;