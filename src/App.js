import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import LoginRedirect from "./pages/LoginRedirect.jsx";
import LogoutRedirect from "./pages/LogoutRedirect.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/clubs" component={Clubs} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/events" component={Events} />
            <ProtectedRoute exact path="/events/new" component={NewEvent} />
            <ProtectedRoute exact path="/events/edit/:id" component={EditEvent} />
            <Route exact path="/loginRedirect" component={LoginRedirect} />
            <Route exact path="/logoutRedirect" component={LogoutRedirect} />
         </Switch>
      </Router>
   );
}

export default App;
