import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SessionContext } from "./api/SessionContext";
import "./App.css";

// Pages {{{
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import ViewClub from "./pages/ViewClub";
import Calendar from "./pages/Calendar";
import LoginRedirect from "./pages/LoginRedirect";
import LogoutRedirect from "./pages/LogoutRedirect";

import OrganizerUpdates from "./pages/organizer/OrganizerUpdates";
import OrganizerEvents from "./pages/organizer/OrganizerEvents";
import OrganizerBudget from "./pages/organizer/OrganizerBudget";

import AdminClubs from "./pages/admin/AdminClubs";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBudgets from "./pages/admin/AdminBudgets";
import AdminUpdates from "./pages/admin/AdminUpdates";
import AdminViewClub from "./pages/admin/AdminViewClub";

import Error404Page from "./pages/Error404Page";
import Error401Page from "./pages/Error401Page";
// }}}

// Components {{{
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
// }}}

const App = () => {
    const sessionContext = useContext(SessionContext);

    return (
        <>
            <Sidebar session={sessionContext.session} />
            {/* <Navbar session={sessionContext.session} /> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/clubs" component={Clubs} />
                <Route exact path="/clubs/:id" component={ViewClub} />
                <Route exact path="/calendar" component={Calendar} />
                {/* <Route exact path="/blog" component={Blog} /> */}
                {/* <Route exact path="/contact" component={Contact} /> */}

                {/* Organizer routes */}
                <ProtectedRoute
                    allowed={["organizer"]}
                    exact
                    path={["/organizer/updates", "/organizer"]}
                    component={OrganizerUpdates}
                />
                <ProtectedRoute
                    allowed={["organizer"]}
                    exact
                    path="/organizer/events"
                    component={OrganizerEvents}
                />
                <ProtectedRoute
                    allowed={["organizer"]}
                    exact
                    path="/organizer/budget"
                    component={OrganizerBudget}
                />

                {/* Admin routes */}
                <ProtectedRoute
                    allowed={["cc_admin"]}
                    exact
                    path={["/admin/clubs", "/admin"]}
                    component={AdminClubs}
                />
                <ProtectedRoute
                    allowed={["cc_admin"]}
                    exact
                    path="/admin/clubs/:id"
                    component={AdminViewClub}
                />
                <ProtectedRoute
                    allowed={["cc_admin"]}
                    exact
                    path="/admin/users"
                    component={AdminUsers}
                />
                <ProtectedRoute
                    allowed={["cc_admin"]}
                    exact
                    path="/admin/budgets"
                    component={AdminBudgets}
                />
                <ProtectedRoute
                    allowed={["cc_admin"]}
                    exact
                    path="/admin/updates"
                    component={AdminUpdates}
                />
                {/* <ProtectedRoute path="/admin/users/:id" component={AdminViewCoord} /> */}
                {/* <ProtectedRoute exact path="/admin/council" component={AdminCouncil} /> */}
                {/* <ProtectedRoute path="/admin/council/:id" component={AdminViewCouncil} /> */}

                {/* Auth routes */}
                <Route exact path="/loginRedirect" component={LoginRedirect} />
                <Route exact path="/logoutRedirect" component={LogoutRedirect} />

                {/* Error routes */}
                <Route exact path="/404" component={Error404Page} />
                <Route exact path="/401" component={Error401Page} />

                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
