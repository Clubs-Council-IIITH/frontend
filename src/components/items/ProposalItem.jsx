import React from "react";
import { Card, CardBody, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const ProposalItem = (props) => {
    return (
        <Card className="proposal-card dash-card elevate">
            <CardBody>
                <div className="proposal-date"> {formatDateTime(props.datetime).date} </div>
                <div className="proposal-time"> {formatDateTime(props.datetime).time} </div>
                <div className="proposal-link mt-3">
                    <InputGroup>
                        <Input type="text" value={props.link} readonly />
                        <InputGroupAddon addonType="append" className="proposal-link-btn">
                            <Button
                                color="secondary"
                                className="open-btn"
                                onClick={() => window.open(props.link, "_blank")}
                            >
                                <img src="/open-18.svg" className="btn-icon mb-1 mr-1" alt="O" />
                                <span> OPEN </span>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="proposal-pdf mt-3"> {props.pdf} </div>
            </CardBody>
        </Card>
    );
};

export default ProposalItem;
