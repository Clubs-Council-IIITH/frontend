import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
   if (Date.parse(localStorage.getItem("expirationDate")) < new Date().getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      console.log("delet");
   }
   console.log("protecc");
   return (
      <Route
         {...rest}
         render={(props) => {
            if (localStorage.getItem("token") === null) return <Redirect to="/" />;
            else return <Component {...props} />;
         }}
      />
   );
};

export default ProtectedRoute;
