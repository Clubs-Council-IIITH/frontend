import React from "react";
import { Col, Container } from "reactstrap";

const NullIndicator = (props) => {
    return (
        <Col className="loading-container p-0 mx-0 my-4 my-md-5">
            <Container fluid className="loading-container">
                <img src="/shrug-18.svg" alt="empty" className="null-img" />
                <div className="null-msg mt-3">
                    {props.msg ? props.msg : "there's nothing here..."}
                </div>
            </Container>
        </Col>
    );
};

export default NullIndicator;
