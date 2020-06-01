import React, { Component } from "react";

import { Redirect } from "react-router-dom";

class LogoutRedirect extends Component {
   componentDidMount() {
      localStorage.removeItem("token");
      window.location.href = "http://localhost:8000/accounts/logout";
   }

   render() {
      return null;
   }
}

export default LogoutRedirect;
