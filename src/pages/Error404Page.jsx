import React from "react";
import { Container } from "reactstrap";

import Transition from "../components/TransitionContainer";

const Error404Page = () => {
    return (
        <Transition>
            <Container fluid className="error-page">
                <img src="/404.svg" alt="404" className="e404-banner" />
                <div className="error-msg mt-4 mt-md-5"> page not found. </div>
            </Container>
        </Transition>
    );
};

export default Error404Page;
