import React from "react";
import ReactLoading from "react-loading";
import { Container } from "reactstrap";

import Page from "./PageContainer";

const LoadingBar = () => {
    return (
        <Container className="loading-container">
            <ReactLoading type="bars" color="black" />
        </Container>
    );
};

export default LoadingBar;
