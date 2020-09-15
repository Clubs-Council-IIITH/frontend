import React from "react";
import { Container } from "reactstrap";
import FadeIn from "react-fade-in";

const PageContainer = ({ fluid, children }) => {
    return (
        <Container fluid={fluid} tag={FadeIn} className="page-container">
            {children}
        </Container>
    );
};

export default PageContainer;
