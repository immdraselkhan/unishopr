import React from "react";
import Protected from "@components/layout/protected";
import AccountLayout from "@components/layout/account";
import AccountDetails from "@containers/account/profile";
import ProfileNav from "@components/layout/profile-nav";

const ProfilePage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Profile Details"} nav={<ProfileNav/>} >
                <AccountDetails />
            </AccountLayout>
        </Protected>
    );
};

export default ProfilePage;
