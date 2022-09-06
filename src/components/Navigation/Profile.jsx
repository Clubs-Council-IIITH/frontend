import { useMediaQuery } from "react-responsive";

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

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return isTabletOrMobile ? (
        <MobileProfile Login={Login} Logout={Logout} />
    ) : (
        <DesktopProfile Login={Login} Logout={Logout} />
    );
};

export default Profile;
