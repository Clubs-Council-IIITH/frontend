import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import EditEvent from "./pages/EditEvent";
import LoginRedirect from "./pages/LoginRedirect";
import LogoutRedirect from "./pages/LogoutRedirect";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    const [contextAction, setContextAction] = useState("");
    const [contextString, setContextString] = useState("");
    const [authAction, setAuthAction] = useState("");
    const [authString, setAuthString] = useState("");

    const setContext = useCallback(() => {
        const usergroup = localStorage.getItem("usergroup");
        switch (usergroup) {
            case "organizer":
                setContextAction("/events");
                setContextString("MY EVENTS");
                break;
            case "cc_admin":
                setContextAction("/admin/dashboard");
                setContextString("DASHBOARD");
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        setAuthAction("http://localhost:8000/token");
        setAuthString("LOGIN");
        if (localStorage.getItem("token") !== null) {
            setAuthAction("/logoutRedirect");
            setAuthString("LOGOUT");
            setContext();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const authProps = { action: authAction, string: authString };
    const contextProps = { action: contextAction, string: contextString };

    return (
        <Router>
            <Navbar auth={authProps} context={contextProps} />
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

                <Route exact path="/loginRedirect" component={LoginRedirect} />
                <Route exact path="/logoutRedirect" component={LogoutRedirect} />
            </Switch>
        </Router>
    );
};

export default App;
