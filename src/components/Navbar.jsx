import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    NavbarText,
} from "reactstrap";

import "../config";

const Navigationbar = (props) => {
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
            <React.Fragment>
                <NavItem className="nav-item mx-md-2 nav-divider">
                    <NavbarText>•</NavbarText>
                </NavItem>

                <NavItem className="nav-item mx-md-2">
                    <NavLink tag={Link} to={contextAction} activeClassName="active">
                        {contextString}
                    </NavLink>
                </NavItem>
            </React.Fragment>
        );
    }

    return (
        <Navbar className="nav-dark py-3" color="dark" dark expand="md" fixed="top">
            <NavbarBrand href="/">
                <img className="nav-logo ml-md-3" src="/cc_logo.svg" alt="cc_logo" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="m-auto" navbar>
                    <NavItem className="nav-item mx-md-2 mt-3 mt-md-0">
                        <NavLink tag={Link} to="/" activeClassName="active" exact path="/">
                            HOME
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-item mx-md-2">
                        <NavLink tag={Link} to="/clubs" activeClassName="active">
                            CLUBS
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-item mx-md-2">
                        <NavLink tag={Link} to="/calendar" activeClassName="active">
                            CALENDAR
                        </NavLink>
                    </NavItem>
                    {/* <NavItem className="nav-item mx-md-2"> */}
                    {/*     <NavLink tag={Link} to="/blog" activeClassName="active"> */}
                    {/*         BLOG */}
                    {/*     </NavLink> */}
                    {/* </NavItem> */}
                    {/* <NavItem className="nav-item mx-md-2"> */}
                    {/*     <NavLink tag={Link} to="/contact" activeClassName="active"> */}
                    {/*         CONTACT */}
                    {/*     </NavLink> */}
                    {/* </NavItem> */}
                    {contextButton}
                </Nav>
                <a href={isAuthenticated ? logoutURL : loginURL}>
                    <Button className="nav-btn mr-md-3 mt-3 mt-md-0" outline color="light">
                        {isAuthenticated ? "LOG OUT" : "LOG IN"}
                    </Button>
                </a>
            </Collapse>
        </Navbar>
    );
};

export default Navigationbar;
