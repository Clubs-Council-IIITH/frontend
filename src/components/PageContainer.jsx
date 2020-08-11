import React from "react";
import { Container } from "reactstrap";
import FadeIn from "react-fade-in";

const PageContainer = ({ className, children }) => {
    return (
        <Container fluid tag={FadeIn} className={className}>
            {children}
        </Container>
    );
};

export default PageContainer;
