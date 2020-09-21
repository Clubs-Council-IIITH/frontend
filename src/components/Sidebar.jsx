import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";

import Leftbar from "./Leftbar";

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

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
                <Nav className="mr-auto" navbar></Nav>
                <NavbarText>updates</NavbarText>
            </Navbar>
            <Leftbar session={props.session} isOpen={isOpen} toggle={toggle} />
        </>
    );
};
export default Sidebar;
