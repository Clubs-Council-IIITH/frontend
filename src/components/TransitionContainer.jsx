import React from "react";
import { Container } from "reactstrap";
import FadeIn from "react-fade-in";

const TransitionContainer = ({ children }) => {
    return (
        <Container fluid tag={FadeIn} className="m-0 p-0">
            {children}
        </Container>
    );
};

export default TransitionContainer;
