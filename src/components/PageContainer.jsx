import React from "react";
import { Container } from "reactstrap";
import FadeIn from "react-fade-in";

const PageContainer = ({ header, fluid, className, children }) => {
    return (
        <Container
            fluid={fluid}
            tag={FadeIn}
            className={(header ? "actionbar-header mt-0 pt-0 " : "") + className}
        >
            {children}
        </Container>
    );
};

export default PageContainer;
