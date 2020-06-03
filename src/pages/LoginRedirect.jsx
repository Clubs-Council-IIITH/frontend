import React, { Component } from "react";

import { Redirect } from "react-router-dom";

class LoginRedirect extends Component {
   componentDidMount() {
      const token = this.props.location.search.substring(7);
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      const usergroup = this.props.location.search.split("&")[1].substring(10);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("usergroup", usergroup);
   }

   render() {
      return <Redirect to="/" />;
   }
}

export default LoginRedirect;
