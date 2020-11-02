import React from "react";
import { Container } from "reactstrap";

const PageContainer = ({ fluid, children }) => {
    return (
        <Container fluid={fluid} className="page-container">
            {children}
        </Container>
    );
};

export default PageContainer;
