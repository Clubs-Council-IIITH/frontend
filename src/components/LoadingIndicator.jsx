import React from "react";
import ReactLoading from "react-loading";
import { Container } from "reactstrap";

const LoadingIndicator = () => {
    return (
        <Container className="loading-container">
            <ReactLoading type="bars" color="black" />
        </Container>
    );
};

export default LoadingIndicator;
