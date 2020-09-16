import React from "react";
import { Container } from "reactstrap";

import Transition from "../components/TransitionContainer";

const Error401Page = () => {
    return (
        <Transition>
            <Container fluid className="error-page">
                <img src="/401.svg" alt="401" className="e401-banner ml-n3 ml-md-n5" />
                <div className="error-msg mt-4 mt-md-5"> unauthorized. </div>
            </Container>
        </Transition>
    );
};

export default Error401Page;
