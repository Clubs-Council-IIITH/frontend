import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Clubs from "./pages/Clubs";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import LoginRedirect from "./pages/LoginRedirect.jsx";
import LogoutRedirect from "./pages/LogoutRedirect.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/clubs" component={Clubs} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/loginRedirect" component={LoginRedirect} />
            <Route exact path="/logoutRedirect" component={LogoutRedirect} />
         </Switch>
      </Router>
   );
}

export default App;
