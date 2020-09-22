import React, { useState, createContext } from "react";
import { Container, Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";

import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { useWindowDimensions } from "../utils/WindowDimensions";

export const PageContext = createContext();

const Navigation = (props) => {
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isRightOpen, setIsRightOpen] = useState(false);

    const { width } = useWindowDimensions();

    const rightbarEnabled = ["organizer", "cc_admin"].includes(props.session.usergroup);

    const toggleLeft = () => {
        if (isRightOpen) setIsRightOpen(!isRightOpen);
        setIsLeftOpen(!isLeftOpen);
    };

    const toggleRight = () => {
        if (isLeftOpen) setIsLeftOpen(!isLeftOpen);
        setIsRightOpen(!isRightOpen);
    };

    return (
        <>
            <Navbar light className="nav-top" fixed="top" expand="xs">
                <NavbarBrand onClick={toggleLeft}>
                    <img
                        className="nav-logo-sm invert clickable d-block d-md-none"
                        src="/cc_logo_sm.svg"
                        alt="cc_logo"
                    />
                </NavbarBrand>
                <Nav className="mr-auto" navbar></Nav>
                {rightbarEnabled ? (
                    <NavbarText onClick={toggleRight}>
                        <img
                            className="update-icon-sm clickable d-xlp-hidden"
                            src="/sb-updates-18.svg"
                            alt="updates"
                        />
                    </NavbarText>
                ) : null}
            </Navbar>
            <Leftbar
                session={props.session}
                toggle={toggleLeft}
                open={isLeftOpen}
                full={width > 992}
                minimized={width <= 992 && width > 768}
                collapsed={width <= 768}
            />
            {rightbarEnabled ? (
                <Rightbar
                    session={props.session}
                    toggle={toggleRight}
                    open={isRightOpen}
                    full={width > 1400}
                    collapsed={width <= 1400}
                />
            ) : null}
            <PageContext.Provider value={{ rightbarEnabled }}>
                <Container
                    fluid
                    className={`page-container page-leftbar ${
                        rightbarEnabled ? "page-rightbar" : ""
                    }`}
                >
                    {props.children}
                </Container>
            </PageContext.Provider>
        </>
    );
};
export default Navigation;
