import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { SessionContext } from "./api/SessionContext";
import "./App.css";

// Pages {{{
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Clubs from "./pages/Clubs";
import ViewClub from "./pages/ViewClub";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import LoginRedirect from "./pages/LoginRedirect";
import LogoutRedirect from "./pages/LogoutRedirect";

import OrganizerEvents from "./pages/organizer/OrganizerEvents";

import AdminClubs from "./pages/admin/AdminClubs";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminViewClub from "./pages/admin/AdminViewClub";
// }}}

// Components {{{
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
// }}}

const App = () => {
    const sessionContext = useContext(SessionContext);

    return (
        <>
            <Navbar session={sessionContext.session} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/clubs" component={Clubs} />
                <Route exact path="/clubs/:id" component={ViewClub} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/contact" component={Contact} />

                {/* Organizer routes */}
                <ProtectedRoute
                    exact
                    path={["/organizer/events", "/organizer"]}
                    component={OrganizerEvents}
                />

                {/* Admin routes */}
                <ProtectedRoute exact path={["/admin/clubs", "/admin"]} component={AdminClubs} />
                <ProtectedRoute exact path="/admin/clubs/:id" component={AdminViewClub} />
                <ProtectedRoute exact path="/admin/users" component={AdminUsers} />
                {/* <ProtectedRoute path="/admin/users/:id" component={AdminViewCoord} /> */}
                {/* <ProtectedRoute exact path="/admin/council" component={AdminCouncil} /> */}
                {/* <ProtectedRoute path="/admin/council/:id" component={AdminViewCouncil} /> */}

                <Route exact path="/loginRedirect" component={LoginRedirect} />
                <Route exact path="/logoutRedirect" component={LogoutRedirect} />
            </Switch>
        </>
    );
};

export default App;
