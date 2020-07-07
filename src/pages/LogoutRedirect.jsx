import React, { useEffect } from "react"; // eslint-disable-line

const LogoutRedirect = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:8000/accounts/logout";
    });
    return null;
};

export default LogoutRedirect;
