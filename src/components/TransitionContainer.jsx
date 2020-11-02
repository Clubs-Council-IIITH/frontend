import React from "react";
import { Container } from "reactstrap";
import FadeIn from "react-fade-in";

const TransitionContainer = ({ children, className }) => {
    return (
        <Container fluid tag={FadeIn} delay={20} className={`m-0 p-0 ${className}`}>
            {children}
        </Container>
    );
};

export default TransitionContainer;
