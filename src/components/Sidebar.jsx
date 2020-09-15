import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import "../config";

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextAction, setContextAction] = useState("");
    const [contextString, setContextString] = useState("");

    const isAuthenticated = props.session.is_authenticated;
    const usergroup = props.session.usergroup;
    const loginURL = global.config.loginUrl;
    const logoutURL = "/logoutRedirect";

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const usergroup = props.session.usergroup;
        switch (usergroup) {
            case "organizer":
                setContextAction("/organizer");
                setContextString("MANAGE CLUB");
                break;
            case "cc_admin":
                setContextAction("/admin");
                setContextString("DASHBOARD");
                break;
            default:
                break;
        }
    }, [props.session]);

    var contextButton = null;
    if (usergroup) {
        contextButton = (
            <NavItem className="nav-item">
                <NavLink
                    tag={Link}
                    to={contextAction}
                    className="d-flex flex-row"
                    activeClassName="active nav-icon-active"
                >
                    <img
                        src="/sb-dashboard-18.svg"
                        alt="D"
                        className="nav-icon d-none d-md-block mr-3"
                    />
                    <span className="d-none d-lg-block"> {contextString} </span>
                </NavLink>
            </NavItem>
        );
    }

    return (
        <Navbar className="sidebar nav-dark d-none d-md-block p-4" dark>
            <NavbarBrand href="/">
                <img className="nav-logo d-none d-lg-block" src="/cc_logo.svg" alt="cc_logo" />
                <img
                    className="nav-logo-sm d-none d-sm-block d-lg-none"
                    src="/cc_logo_sm.svg"
                    alt="cc_logo"
                />
            </NavbarBrand>
            <Nav className="m-auto d-flex justify-content-between sidebar-nav" navbar>
                <div className="pt-5">
                    <div className="sidebar-item my-3">
                        <NavItem className="nav-item">
                            <NavLink
                                tag={Link}
                                to="/"
                                className="d-flex flex-row"
                                activeClassName="active nav-icon-active"
                                exact
                                path="/"
                            >
                                <img
                                    src="/sb-home-18.svg"
                                    alt="H"
                                    className="nav-icon d-none d-md-block mr-3"
                                />
                                <span className="d-none d-lg-block"> HOME </span>
                            </NavLink>
                        </NavItem>
                    </div>
                    <div className="sidebar-item my-3">
                        <NavItem className="nav-item">
                            <NavLink
                                tag={Link}
                                to="/clubs"
                                className="d-flex flex-row"
                                activeClassName="active nav-icon-active"
                            >
                                <img
                                    src="/sb-explore-18.svg"
                                    alt="C"
                                    className="nav-icon d-none d-md-block mr-3"
                                />
                                <span className="d-none d-lg-block"> CLUBS </span>
                            </NavLink>
                        </NavItem>
                    </div>
                    <div className="sidebar-item my-3">
                        <NavItem className="nav-item">
                            <NavLink
                                tag={Link}
                                to="/calendar"
                                className="d-flex flex-row"
                                activeClassName="active nav-icon-active"
                            >
                                <img
                                    src="/sb-calendar-18.svg"
                                    alt="C"
                                    className="nav-icon d-none d-md-block mr-3"
                                />
                                <span className="d-none d-lg-block"> CALENDAR </span>
                            </NavLink>
                        </NavItem>
                    </div>
                    <div className="sidebar-item my-3">{contextButton}</div>
                </div>
                <div>
                    <div className="sidebar-item">
                        <NavItem className="nav-item d-flex flex-row">
                            <img
                                src="/sb-login-18.svg"
                                alt="C"
                                className="nav-icon d-none d-md-block mr-3"
                            />
                            <span className="d-none d-lg-block">
                                <a href={isAuthenticated ? logoutURL : loginURL}>
                                    {isAuthenticated ? "LOG OUT" : "LOG IN"}
                                </a>
                            </span>
                        </NavItem>
                    </div>
                </div>
            </Nav>
        </Navbar>
    );
};
export default Sidebar;
