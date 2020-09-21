import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";

import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

const Sidebar = (props) => {
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isRightOpen, setIsRightOpen] = useState(false);

    const toggleLeft = () => {
        setIsLeftOpen(!isLeftOpen);
    };

    const toggleRight = () => {
        setIsRightOpen(!isRightOpen);
    };

    return (
        <>
            <Navbar light className="nav-top" fixed="top" expand="xs">
                <NavbarBrand onClick={toggleLeft}>
                    <img
                        className="nav-logo-sm-inv clickable d-block d-md-none"
                        src="/cc_logo_sm.svg"
                        alt="cc_logo"
                    />
                </NavbarBrand>
                <Nav className="mr-auto" navbar></Nav>
                <NavbarText onClick={toggleRight}>updates</NavbarText>
            </Navbar>
            <Leftbar session={props.session} isOpen={isLeftOpen} toggle={toggleLeft} />
            <Rightbar session={props.session} isOpen={isRightOpen} toggle={toggleRight} />
        </>
    );
};
export default Sidebar;
