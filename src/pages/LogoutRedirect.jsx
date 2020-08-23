import React, { useEffect } from "react"; // eslint-disable-line
import { Redirect } from "react-router-dom";

import API from "../api/methods";

import "../config";

const LogoutRedirect = () => {
    const url = global.config.logoutRedirectUrl;

    useEffect(() => {
        API.logout();
        window.location.href = global.config.logoutRedirectUrl;
    });
    return null;
};

export default LogoutRedirect;
