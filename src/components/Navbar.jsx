import React, { useState } from "react";
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

const Navigationbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    var contextButton = "";
    if (!(props.context.string === "")) {
        contextButton = (
            <React.Fragment>
                <NavItem className="nav-item mx-md-2">
                    <NavbarText>•</NavbarText>
                </NavItem>

                <NavItem className="nav-item mx-md-2">
                    <NavLink tag={Link} to={props.context.action} activeClassName="active">
                        {props.context.string}
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
                    <NavItem className="nav-item mx-md-2">
                        <NavLink tag={Link} to="/blog" activeClassName="active">
                            BLOG
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-item mx-md-2">
                        <NavLink tag={Link} to="/contact" activeClassName="active">
                            CONTACT
                        </NavLink>
                    </NavItem>
                    {contextButton}
                </Nav>
                <a href={props.auth.action}>
                    <Button className="nav-btn mr-md-3 mt-3 mt-md-0" outline color="light">
                        {props.auth.string}
                    </Button>
                </a>
            </Collapse>
        </Navbar>
    );
};

export default Navigationbar;
