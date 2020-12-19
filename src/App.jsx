import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SessionContext } from "./api/SessionContext";
import "./App.css";

// Pages {{{
import Home from "./pages/Home";

import PublicClubs from "./pages/public/PublicClubs";
import PublicCalendar from "./pages/public/PublicCalendar";
import PublicClubEvents from "./pages/public/PublicClubEvents";
import PublicClubMembers from "./pages/public/PublicClubMembers";

import AdminClubs from "./pages/admin/AdminClubs";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBudgets from "./pages/admin/AdminBudgets";

import ClubEvents from "./pages/club/ClubEvents";
import ClubBudget from "./pages/club/ClubBudget";
import ClubActivity from "./pages/club/ClubActivity";
import ClubMembers from "./pages/club/ClubMembers";

import LoginRedirect from "./pages/LoginRedirect";
import LogoutRedirect from "./pages/LogoutRedirect";

import Error404Page from "./pages/Error404Page";
import Error401Page from "./pages/Error401Page";
// }}}

// Components {{{
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
// }}}

const App = () => {
    const sessionContext = useContext(SessionContext);

    return (
        <>
            <Navigation session={sessionContext.session}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/blog" component={PublicBlog} /> */}
                    <Route exact path="/clubs" component={PublicClubs} />
                    {/* <Route exact path="/contact" component={PublicContact} /> */}
                    <Route exact path="/calendar" component={PublicCalendar} />
                    <Route exact path="/clubs/:id/events" component={PublicClubEvents} />
                    <Route exact path="/clubs/:id/members" component={PublicClubMembers} />

                    {/* Admin routes {{{ */}
                    <Route
                        exact
                        path="/admin"
                        render={() => <Redirect replace to="/admin/clubs" />}
                    />
                    <ProtectedRoute
                        allowed={["cc_admin"]}
                        exact
                        path="/admin/clubs"
                        component={AdminClubs}
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
                        path="/admin/reports"
                        component={AdminBudgets}
                    />
                    {/* <ProtectedRoute path="/admin/users/:id" component={AdminViewCoord} /> */}
                    {/* <ProtectedRoute exact path="/admin/council" component={AdminCouncil} /> */}
                    {/* <ProtectedRoute path="/admin/council/:id" component={AdminViewCouncil} /> */}
                    {/* }}} */}

                    {/* Club routes {{{ */}
                    <Route
                        exact
                        path={["(/admin)?/clubs/:id", "/club"]}
                        render={({ match }) => <Redirect replace to={`${match.url}/events`} />}
                    />
                    <ProtectedRoute
                        allowed={["cc_admin", "organizer"]}
                        exact
                        path={["/admin/clubs/:id/events", "/club/events"]}
                        component={ClubEvents}
                    />
                    <ProtectedRoute
                        allowed={["cc_admin", "organizer"]}
                        exact
                        path={["/admin/clubs/:id/members", "/club/members"]}
                        component={ClubMembers}
                    />
                    <ProtectedRoute
                        allowed={["cc_admin", "organizer"]}
                        exact
                        path={["/admin/clubs/:id/report", "/club/report"]}
                        component={ClubBudget}
                    />
                    <ProtectedRoute
                        allowed={["cc_admin"]}
                        exact
                        path="/admin/clubs/:id/activity"
                        component={ClubActivity}
                    />
                    {/* }}} */}

                    {/* Auth routes {{{ */}
                    <Route exact path="/loginRedirect" component={LoginRedirect} />
                    <Route exact path="/logoutRedirect" component={LogoutRedirect} />
                    {/* }}} */}

                    {/* Error routes {{{ */}
                    <Route exact path="/404" component={Error404Page} />
                    <Route exact path="/401" component={Error401Page} />
                    <Redirect to="/404" />
                    {/* }}} */}
                </Switch>
            </Navigation>
        </>
    );
};

export default App;
