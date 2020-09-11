import React from "react";
import Linkify from "react-linkify";
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
                <div className="update-content mb-3">
                    <Linkify> {props.content} </Linkify>
                </div>
                {props.admin ? (
                    <>
                        <hr className="mt-4" />
                        <div className="update-creator text-right"> {props.creator}</div>
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default UpdateItem;
