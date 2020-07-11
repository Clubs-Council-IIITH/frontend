import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";

const AdminViewClub = (props) => {
    const [club, SetClub] = useState(false);
    const [events, SetEvents] = useState(false);
    const [activities, SetActivities] = useState(false);

    useEffect(() => {
        axios
            .get("/api/clubs", { params: { id: props.match.params.id } })
            .then((response) => {
                console.log(response);
                SetClub(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("/api/events", {
                headers: { Authorization: "Token " + localStorage.getItem("token") },
            })
            .then((response) => {
                console.log(response);
                SetEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("/api/logs", {
                headers: { Authorization: "Token " + localStorage.getItem("token") },
            })
            .then((response) => {
                console.log(response);
                SetActivities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderClub = () => {
        if (!club) return null;
        return (
            <React.Fragment>
                <h2> {club.name} </h2>
                {club.coordinators.map((coord) => (
                    <h5>
                        {coord.name}, {coord.role}
                    </h5>
                ))}
            </React.Fragment>
        );
    };

    const renderEvents = () => {
        if (!events) return null;
        return (
            <React.Fragment>
                {events.map((event) => (
                    <Card>
                        {event.datetime}
                        {event.name}
                        {event.state}
                    </Card>
                ))}
            </React.Fragment>
        );
    };

    const renderActivities = () => {
        if (!activities) return null;
        return (
            <React.Fragment>
                {activities.map((activity) => (
                    <Card>
                        {activity.timestamp}
                        {activity.actor}
                        {activity.action}
                        {activity.event[0]["name"]}
                    </Card>
                ))}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Container fluid className="pt-5">
                <Row className="mx-2 d-flex">
                    <Col md="4" className="m-3 card">
                        {renderClub()}
                    </Col>
                    <Col className="m-3">
                        <Row className="card">{renderEvents()}</Row>
                        <Row className="mt-4 card">{renderActivities()}</Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default AdminViewClub;
