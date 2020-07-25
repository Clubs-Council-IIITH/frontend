import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "reactstrap";

import API from "../../api/methods";

const AdminViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [events, setEvents] = useState(false);
    const [logs, setLogs] = useState(false);

    useEffect(() => {
        async function getClub() {
            const res = await API.view("clubs", { id: props.match.params.id });
            setClub(res.data[0]);
        }

        async function getEvents() {
            const res = await API.view("events", {});
            setEvents(res.data);
        }

        async function getLogs() {
            const res = await API.view("logs", {});
            setLogs(res.data);
        }

        getClub();
        getEvents();
        getLogs();
    }, []); // eslint-disable-line

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

    const renderLogs = () => {
        console.log(logs);
        if (!logs) return null;
        return (
            <React.Fragment>
                {logs.map((log) => (
                    <Card>
                        {log.timestamp}
                        {log.event[0]["creator"]}
                        {log.action}
                        {log.event[0]["name"]}
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
                        <Row className="mt-4 card">{renderLogs()}</Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default AdminViewClub;
