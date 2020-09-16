import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from "reactstrap";

import "../config";

const SidebarNavItem = (props) => {
    return (
        <div className="sidebar-item my-3">
            <NavItem className="nav-item">
                <NavLink
                    tag={Link}
                    to={props.link}
                    className="d-flex flex-row"
                    activeClassName="active nav-icon-active"
                    exact={props.exact}
                >
                    <img
                        src={props.icon}
                        alt="C"
                        className={`nav-icon mr-3 d-none d-md-block ${
                            props.isOpen ? "d-block" : ""
                        }`}
                    />
                    <span className={`d-none d-lg-block ${props.isOpen ? "d-block" : ""}`}>
                        {props.text}
                    </span>
                </NavLink>
            </NavItem>
        </div>
    );
};

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
            <SidebarNavItem
                link={contextAction}
                icon="/sb-dashboard-18.svg"
                text={contextString}
                isOpen={isOpen}
            />
        );
    }

    return (
        <>
            <Navbar light className="nav-light" fixed="top" expand="xs">
                <NavbarBrand onClick={toggle}>
                    <img
                        className="nav-logo-sm-inv clickable d-block d-md-none"
                        src="/cc_logo_sm.svg"
                        alt="cc_logo"
                    />
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {/* <NavItem> */}
                    {/*     <NavLink href="/components/">Components</NavLink> */}
                    {/* </NavItem> */}
                    {/* <NavItem> */}
                    {/*     <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
                    {/* </NavItem> */}
                </Nav>
                <NavbarText>updates</NavbarText>
            </Navbar>
            <Navbar
                dark
                className={`sidebar nav-dark p-4 d-none d-md-block ${
                    isOpen ? "d-block sidebar-collapse" : ""
                }`}
            >
                <NavbarBrand className="d-flex flex-row justify-content-between">
                    <Link to="/" className=" d-none d-lg-block">
                        <img className="nav-logo" src="/cc_logo.svg" alt="cc_logo" />
                    </Link>
                    <img
                        className={`nav-logo-sm clickable d-none d-sm-block d-lg-none ${
                            isOpen ? "d-block" : ""
                        }`}
                        src="/cc_logo_sm.svg"
                        alt="cc_logo"
                        onClick={toggle}
                    />
                    <img
                        className={`nav-close clickable d-none d-lg-none ${
                            isOpen ? "d-block" : ""
                        }`}
                        src="/sb-close-18.svg"
                        alt="X"
                        onClick={toggle}
                    />
                </NavbarBrand>
                <Nav className="m-auto d-flex justify-content-between sidebar-nav" navbar>
                    <div className="pt-5">
                        <SidebarNavItem
                            exact
                            link="/"
                            icon="/sb-home-18.svg"
                            text="HOME"
                            isOpen={isOpen}
                        />
                        <SidebarNavItem
                            link="/clubs"
                            icon="/sb-explore-18.svg"
                            text="CLUBS"
                            isOpen={isOpen}
                        />
                        <SidebarNavItem
                            link="/calendar"
                            icon="/sb-calendar-18.svg"
                            text="CALENDAR"
                            isOpen={isOpen}
                        />
                        {contextButton}
                    </div>
                    <div>
                        <div className="sidebar-item">
                            <NavItem className="nav-item d-flex flex-row">
                                <a
                                    className="sidebar-nav-link d-flex flex-row"
                                    href={isAuthenticated ? logoutURL : loginURL}
                                >
                                    <img
                                        src="/sb-login-18.svg"
                                        alt="C"
                                        className={`nav-icon mr-3 d-none d-md-block ${
                                            isOpen ? "d-block" : ""
                                        }`}
                                    />
                                    <span
                                        className={`d-none d-lg-block ${isOpen ? "d-block" : ""}`}
                                    >
                                        {isAuthenticated ? "LOG OUT" : "LOG IN"}
                                    </span>
                                </a>
                            </NavItem>
                        </div>
                    </div>
                </Nav>
            </Navbar>
        </>
    );
};
export default Sidebar;
