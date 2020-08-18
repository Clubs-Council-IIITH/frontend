import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { SessionContext } from "../api/SessionContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { session } = useContext(SessionContext);

    if (Date.parse(localStorage.getItem("expiration_date")) < new Date().getTime()) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration_date");
        return <Redirect to="/401" />;
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!rest.allowed.includes(session.usergroup)) return <Redirect to="/401" />;
                else return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
