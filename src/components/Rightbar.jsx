import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Navbar, NavItem, NavbarBrand, Nav, NavLink } from "reactstrap";

import "../config";

const SidebarNavItem = (props) => {
    return (
        <div className="rightbar-item my-3">
            <NavItem className="nav-item">
                <NavLink
                    tag={Link}
                    to={props.link}
                    className="d-flex flex-row"
                    activeClassName="active nav-icon-active"
                    exact={props.exact}
                >
                    <span className={`d-none d-lg-block ${props.isOpen ? "d-block" : ""}`}>
                        {props.text}
                    </span>
                </NavLink>
            </NavItem>
        </div>
    );
};

const Rightbar = (props) => {
    const [contextAction, setContextAction] = useState("");
    const [contextString, setContextString] = useState("");

    const isAuthenticated = props.session.is_authenticated;
    const usergroup = props.session.usergroup;
    const loginURL = global.config.loginUrl;
    const logoutURL = "/logoutRedirect";

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
            <SidebarNavItem
                link={contextAction}
                icon="/sb-dashboard-18.svg"
                text={contextString}
                isOpen={props.isOpen}
            />
        );
    }

    return (
        <Navbar
            light
            className={`rightbar nav-light p-4 ${props.isOpen ? "d-block rightbar-collapse" : ""}`}
        >
            <NavbarBrand className="d-flex flex-row justify-content-between">
                <Link to="/" className=" d-none d-lg-block">
                    <img className="nav-logo" src="/cc_logo.svg" alt="cc_logo" />
                </Link>
                <img
                    className={`nav-logo-sm clickable d-none d-sm-block d-lg-none ${
                        props.isOpen ? "d-block" : ""
                    }`}
                    src="/cc_logo_sm.svg"
                    alt="cc_logo"
                    onClick={props.toggle}
                />
                <img
                    className={`nav-close clickable d-none d-xl-none ${
                        props.isOpen ? "d-block" : ""
                    }`}
                    src="/sb-close-18.svg"
                    alt="X"
                    onClick={props.toggle}
                />
            </NavbarBrand>
            <Nav className="m-auto d-flex justify-content-between rightbar-nav" navbar>
                <div className="pt-5">
                    <SidebarNavItem
                        exact
                        link="/"
                        icon="/sb-home-18.svg"
                        text="HOME"
                        isOpen={props.isOpen}
                    />
                    <SidebarNavItem
                        link="/clubs"
                        icon="/sb-explore-18.svg"
                        text="CLUBS"
                        isOpen={props.isOpen}
                    />
                    <SidebarNavItem
                        link="/calendar"
                        icon="/sb-calendar-18.svg"
                        text="CALENDAR"
                        isOpen={props.isOpen}
                    />
                    {contextButton}
                </div>
                <div>
                    <div className="rightbar-item">
                        <NavItem className="nav-item d-flex flex-row">
                            <a
                                className="rightbar-nav-link d-flex flex-row"
                                href={isAuthenticated ? logoutURL : loginURL}
                            >
                                <span
                                    className={`d-none d-lg-block ${props.isOpen ? "d-block" : ""}`}
                                >
                                    {isAuthenticated ? "LOG OUT" : "LOG IN"}
                                </span>
                            </a>
                        </NavItem>
                    </div>
                </div>
            </Nav>
        </Navbar>
    );
};

export default Rightbar;
