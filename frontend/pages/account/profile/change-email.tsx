import React from "react";
import Protected from "@components/layout/protected";
import AccountLayout from "@components/layout/account";
import AccountDetails from "@containers/account/profile";
import ProfileNav from "@components/layout/profile-nav";
import ChangeEmail from "@containers/account/profile/change-email";

const ProfilePage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Change Email"} nav={<ProfileNav/>} >
                <ChangeEmail />
            </AccountLayout>
        </Protected>
    );
};

export default ProfilePage;
