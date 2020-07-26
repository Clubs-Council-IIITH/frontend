import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { SessionContext } from "./api/SessionContext";

// Pages {{{
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import EditEvent from "./pages/EditEvent";
import LoginRedirect from "./pages/LoginRedirect";
import LogoutRedirect from "./pages/LogoutRedirect";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClubs from "./pages/admin/AdminClubs";
import AdminViewClub from "./pages/admin/AdminViewClub";
// }}}

// Components {{{
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
// }}}

const App = () => {
    const sessionContext = useContext(SessionContext);

    return (
        <Router>
            <Navbar session={sessionContext.session} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/clubs" component={Clubs} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/contact" component={Contact} />

                {/* Organizer routes */}
                <ProtectedRoute exact path="/events" component={Events} />
                <ProtectedRoute exact path="/events/edit/:id" component={EditEvent} />

                {/* Admin routes */}
                <ProtectedRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <ProtectedRoute exact path="/admin/clubs" component={AdminClubs} />
                {/* <ProtectedRoute path="/admin/clubs/new" component={AdminNewClub} /> */}
                <ProtectedRoute path="/admin/clubs/:id" component={AdminViewClub} />
                {/* <ProtectedRoute path="/admin/clubs/:id/edit" component={AdminEditClub} /> */}
                {/* <ProtectedRoute exact path="/admin/coordinators" component={AdminCoords} /> */}
                {/* <ProtectedRoute path="/admin/coordinators/new" component={AdminNewCoord} /> */}
                {/* <ProtectedRoute path="/admin/coordinators/:id" component={AdminViewCoord} /> */}
                {/* <ProtectedRoute path="/admin/coordinators/:id/edit" component={AdminEditCoord} /> */}
                {/* <ProtectedRoute exact path="/admin/council" component={AdminCouncil} /> */}
                {/* <ProtectedRoute path="/admin/council/new" component={AdminNewCouncil} /> */}
                {/* <ProtectedRoute path="/admin/council/:id" component={AdminViewCouncil} /> */}
                {/* <ProtectedRoute path="/admin/council/:id/edit" component={AdminViewCouncil} /> */}

                <Route exact path="/loginRedirect" component={LoginRedirect} />
                <Route exact path="/logoutRedirect" component={LogoutRedirect} />
            </Switch>
        </Router>
    );
};

export default App;
