import React from "react";
import Protected from "@components/layout/protected";
import AccountLayout from "@components/layout/account";
import ProfileNav from "@components/layout/profile-nav";
import PhoneForm from "@containers/account/profile/change-phone";

const ProfilePage: React.FC = () => {
    return (
        <Protected>
            <AccountLayout title={"Change Phone"} nav={<ProfileNav/>} >
                <PhoneForm />
            </AccountLayout>
        </Protected>
    );
};

export default ProfilePage;
