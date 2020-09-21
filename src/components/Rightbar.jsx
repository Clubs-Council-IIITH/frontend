import React from "react";
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
    return (
        <Navbar
            light
            className={`rightbar nav-light p-4 d-xlp ${
                props.isOpen ? "d-block rightbar-collapse" : ""
            }`}
        >
            <NavbarBrand className="d-flex flex-row justify-content-between">
                <div className="rightbar-title">Updates</div>
                <img
                    className={`nav-close invert clickable d-xlp-none ${
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
                </div>
            </Nav>
        </Navbar>
    );
};

export default Rightbar;
