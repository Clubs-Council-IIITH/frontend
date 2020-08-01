import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";
import EventItem from "../../components/items/EventItem";
import LogItem from "../../components/items/LogItem";
import { isSameDay } from "../../utils/DateTimeFormatter";

const AdminViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [users, setUsers] = useState(false);
    const [events, setEvents] = useState(false);
    const [logs, setLogs] = useState(false);
    const [viewPrevious, setViewPrevious] = useState(false);

    useEffect(() => {
        async function getClub() {
            const club_res = await API.view("clubs", { id: props.match.params.id });
            setClub(club_res.data[0]);
            const users_res = await API.view("coordinators", { club: props.match.params.id });
            setUsers(users_res.data);
            console.log(users_res.data);
        }

        async function getData() {
            const events_res = await API.view("events", { club: props.match.params.id });
            setEvents(events_res.data);
            var tst = Array.from(events_res.data, (e) => e.id);
            console.log(tst);
            const logs_res = await API.view("logs", { events: tst.join() });
            setLogs(logs_res.data);
        }

        getClub();
        getData();
    }, []); // eslint-disable-line

    const togglePrevious = () => {
        setViewPrevious(!viewPrevious);
    };

    const renderClub = () => {
        if (!users) return null;
        return (
            <React.Fragment>
                <h2> {club.name} </h2>
                {users.map((coord) => (
                    <h5>
                        {coord.name}, {coord.roles.filter((role) => role[0] == club.id)[0][1]}
                    </h5>
                ))}
            </React.Fragment>
        );
    };

    const renderEvents = () => {
        if (!events) return null;
        return (
            <React.Fragment>
                {events.map((event) => {
                    const isPrevious = event.state === "completed" || event.state === "deleted";
                    if (viewPrevious ? !isPrevious : isPrevious) return null;
                    return (
                        <Col lg="6" xl="4" key={event.id} className="my-3">
                            <EventItem
                                id={event.id}
                                audience={event.audience}
                                name={event.name}
                                datetime={event.datetime}
                                venue={event.venue}
                                creator={event.creator}
                                state={event.state}
                            />
                        </Col>
                    );
                })}
            </React.Fragment>
        );
    };

    const renderLogs = () => {
        if (!(logs.length > 0)) return null;
        var prevDate = logs[0].timestamp;
        logs[0]["datebreak"] = true;
        logs.forEach(function (log) {
            if (!isSameDay(prevDate, log.timestamp)) {
                log["datebreak"] = true;
                prevDate = log.timestamp;
            }
        });

        return (
            <React.Fragment>
                {logs.map((log) => (
                    <Col md="12" className="my-1">
                        <LogItem
                            datetime={log.timestamp}
                            creator={log.event[0]["creator"]}
                            action={log.action}
                            event={log.event[0]["name"]}
                            datebreak={log.datebreak}
                        />
                    </Col>
                ))}
            </React.Fragment>
        );
    };

    return (
        <Container fluid className="pt-5">
            <Row className="mt-4">
                <Col md="3" className="m-4 card">
                    {renderClub()}
                </Col>
                <Col>
                    <Row className="m-1 m-md-3">
                        <div className="event-header">
                            <span className="event-title p-1 mx-3" onClick={togglePrevious}>
                                {viewPrevious ? "Previous Events" : "Upcoming Events"}
                            </span>
                        </div>
                        <Row className="h-100 w-100 my-4 mx-auto">{renderEvents()}</Row>
                    </Row>
                    <Row className="m-1 m-md-3">
                        <div className="logs-header">
                            <span className="logs-title p-1 mx-3"> Recent Activity </span>
                        </div>
                        <Row className="h-100 w-100 my-2 mx-auto">{renderLogs()}</Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminViewClub;
