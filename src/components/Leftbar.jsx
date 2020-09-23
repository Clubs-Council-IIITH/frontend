import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Navbar, NavItem, Nav, NavLink } from "reactstrap";

import "../config";

const Leftbar = (props) => {
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

    const SidebarNavItem = ({ link, icon, text, exact }) => {
        return (
            <div className="leftbar-item my-3">
                <NavItem className="nav-item">
                    <NavLink
                        tag={Link}
                        to={link}
                        className="d-flex flex-row"
                        activeClassName="active nav-icon-active"
                        exact={exact}
                    >
                        <img
                            src={icon}
                            alt="C"
                            className={`nav-icon mr-3 ${
                                props.open || props.minimized || props.full ? "d-block" : "d-none"
                            }`}
                        />
                        <span
                            className={`text-nowrap ${
                                props.open || props.full ? "d-block" : "d-none"
                            }`}
                        >
                            {text}
                        </span>
                    </NavLink>
                </NavItem>
            </div>
        );
    };

    var contextButton = null;
    if (usergroup) {
        contextButton = (
            <SidebarNavItem
                link={contextAction}
                icon="/sb-dashboard-18.svg"
                text={contextString}
                open={props.open}
            />
        );
    }

    return (
        <Navbar
            dark
            className={`leftbar nav-dark p-4 d-block ${
                props.open && (props.collapsed || props.minimized) ? "leftbar-collapse" : ""
            } ${props.open || props.full || props.minimized ? "showing" : "not-showing"}`}
        >
            <div className="d-flex flex-row justify-content-between p-0">
                <img
                    className={`nav-logo-sm clickable ${
                        props.minimized && !props.open ? "d-block" : "d-none"
                    }`}
                    src="/cc_logo_sm.svg"
                    alt="cc_logo"
                    onClick={props.toggle}
                />
                <Link to="/">
                    <img
                        className={`nav-logo ${props.open || props.full ? "d-block" : "d-none"}`}
                        src="/cc_logo.svg"
                        alt="cc_logo"
                    />
                </Link>
                <img
                    className={`nav-close clickable my-auto ${
                        props.open && (props.collapsed || props.minimized) ? "d-block" : "d-none"
                    }`}
                    src="/sb-close-18.svg"
                    alt="X"
                    onClick={props.toggle}
                />
            </div>
            <Nav className="m-auto d-flex justify-content-between leftbar-nav" navbar>
                <div className="pt-5">
                    <SidebarNavItem exact link="/" icon="/sb-home-18.svg" text="HOME" />
                    <SidebarNavItem link="/clubs" icon="/sb-explore-18.svg" text="CLUBS" />
                    <SidebarNavItem link="/calendar" icon="/sb-calendar-18.svg" text="CALENDAR" />
                    {contextButton}
                </div>
                <div>
                    <div className="leftbar-item">
                        <NavItem className="nav-item">
                            <a
                                className="leftbar-nav-link d-flex flex-row"
                                href={isAuthenticated ? logoutURL : loginURL}
                            >
                                <img
                                    src="/sb-login-18.svg"
                                    alt="C"
                                    className={`nav-icon mr-3 ${
                                        props.open || props.minimized || props.full
                                            ? "d-block"
                                            : "d-none"
                                    }`}
                                />
                                <span
                                    className={`text-nowrap ${
                                        props.open || props.full ? "d-block" : "d-none"
                                    }`}
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

export default Leftbar;
