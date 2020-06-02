// eslint-disable-next-line
import React, { Component } from "react";

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
