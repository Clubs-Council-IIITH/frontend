import React from "react";
import { Card, CardBody } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const UpdateItem = (props) => {
    return (
        <Card className="update-card dash-card flex-fill">
            <CardBody>
                <div className="update-datetime">
                    {props.datetime && formatDateTime(props.datetime).datetime}
                </div>
                <div className="update-title font-weight-bold my-3"> {props.title} </div>
                <div className="update-content"> {props.content} </div>
                <hr />
                <div className="update-creator text-right"> {props.creator}</div>
            </CardBody>
        </Card>
    );
};

export default UpdateItem;
