import React, { useEffect } from "react"; // eslint-disable-line

import API from "../api/methods";

const LogoutRedirect = () => {
    useEffect(() => {
        API.logout();
        window.location.href = "http://localhost:8000/accounts/logout";
    });
    return null;
};

export default LogoutRedirect;
