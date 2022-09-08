import { useContext } from "react";
import { NavigationContext } from "contexts/NavigationContext";

import { useMutation } from "@apollo/client";

import { GET_SESSION } from "queries/auth";
import { DELETE_COOKIE } from "mutations/auth";

import AuthEndpoints from "constants/AuthEndpoints";

import DesktopProfile from "./DesktopProfile";
import MobileProfile from "./MobileProfile";

const Profile = () => {
    const [deleteCookie, { error: deleteError }] = useMutation(DELETE_COOKIE, {
        refetchQueries: [GET_SESSION],
        onCompleted: () => (window.location.href = AuthEndpoints.logout),
    });

    const Login = async () => {
        window.location.href = AuthEndpoints.login;
    };

    const Logout = async () => {
        deleteCookie();
    };

    const { isTabletOrMobile } = useContext(NavigationContext);

    return isTabletOrMobile ? (
        <MobileProfile Login={Login} Logout={Logout} />
    ) : (
        <DesktopProfile Login={Login} Logout={Logout} />
    );
};

export default Profile;
