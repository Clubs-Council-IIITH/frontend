import React, { useEffect } from "react"; // eslint-disable-line

import API from "../api/methods";

import "../config";

const LogoutRedirect = () => {
    useEffect(() => {
        API.logout();
        window.location.href = global.config.logoutRedirectUrl;
    });
    return null;
};

export default LogoutRedirect;
