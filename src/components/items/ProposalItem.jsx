import React from "react";
import { Card, CardBody, Input } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const ProposalItem = (props) => {
    return (
        <Card className="proposal-card dash-card elevate">
            <CardBody>
                <div className="proposal-date"> {formatDateTime(props.datetime).date} </div>
                <div className="proposal-time"> {formatDateTime(props.datetime).time} </div>
                <div className="proposal-link mt-3">
                    <Input type="text" value={props.link} readonly />
                </div>
                <div className="proposal-pdf mt-3"> {props.pdf} </div>
            </CardBody>
        </Card>
    );
};

export default ProposalItem;
