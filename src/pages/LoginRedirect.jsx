import React, { useEffect } from "react"; // eslint-disable-line

import API from "../api/methods";

const LoginRedirect = (props) => {
    useEffect(() => {
        API.login(props);
        window.location.href = "/";
    });
    return null;
};

export default LoginRedirect;
