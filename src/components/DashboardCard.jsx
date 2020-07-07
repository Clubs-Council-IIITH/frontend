import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
    return (
        <Card tag={Link} to={props.link} className="m-3 my-4 shadow dash-card">
            <CardBody>
                <h2> {props.title} </h2>
                <CardText> {props.body} </CardText>
            </CardBody>
        </Card>
    );
};

export default DashboardCard;
