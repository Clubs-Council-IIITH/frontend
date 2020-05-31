import React from "react";
import "./App.css";

import EventsList from "./pages/EventsList";
import LoginRedirect from "./pages/LoginRedirect.jsx";
import LogoutRedirect from "./pages/LogoutRedirect.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={EventsList} />
            <Route exact path="/loginRedirect" component={LoginRedirect} />
            <Route exact path="/logoutRedirect" component={LogoutRedirect} />
         </Switch>
      </Router>
   );
}

export default App;
