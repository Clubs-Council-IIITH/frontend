import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const LogItem = (props) => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col> {formatDateTime(props.datetime).datetime}</Col>
                    <Col> {props.creator} </Col>
                    <Col> {props.action} </Col>
                    <Col> {props.event} </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default LogItem;
