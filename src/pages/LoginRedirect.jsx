import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const LoginRedirect = (props) => {
   useEffect(() => {
      const token = props.location.search.split("&")[0].substring(7);
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      const usergroup = props.location.search.split("&")[1].substring(10);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("usergroup", usergroup);
   });

   return <Redirect to="/" />;
};

export default LoginRedirect;
