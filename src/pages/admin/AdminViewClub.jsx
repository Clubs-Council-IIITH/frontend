import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import EventItem from "../../components/items/EventItem";
import LogItem from "../../components/items/LogItem";
import { isSameDay } from "../../utils/DateTimeFormatter";

const AdminViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [users, setUsers] = useState(false);
    const [events, setEvents] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
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
            setFilteredList(events_res.data);
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
                {filteredList.map((event) => {
                    const isPrevious = event.state === "completed" || event.state === "deleted";
                    if (viewPrevious ? !isPrevious : isPrevious) return null;
                    return (
                        <Col lg="6" key={event.id} className="my-3">
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
        <Container fluid>
            <SecondaryNavbar page="clubs" />
            <Container fluid className="actionbar-container p-4 p-md-5 rounded-lg">
                <div className="actionbar-header mx-md-5 mt-5 pt-3">
                    <span className="actionbar-title p-2">{club.name}</span>
                </div>
            </Container>
            <Row className="p-0">
                <Col xl="8">
                    <Container fluid className="actionbar-container p-3 mt-4 rounded-lg">
                        <div className="actionbar-header">
                            <span className="actionbar-title-thin p-2" onClick={togglePrevious}>
                                {viewPrevious ? "Previous Events" : "Upcoming Events"}
                            </span>
                        </div>
                        <Row className="px-4 px-md-0 mx-md-2 mt-4">
                            <Searchbar dataList={events} setFilteredList={setFilteredList} />
                        </Row>
                    </Container>
                    {renderEvents()}
                </Col>
                <Col>
                    <Container fluid className="actionbar-container p-3 mt-4 rounded-lg">
                        <div className="actionbar-header">
                            <span className="actionbar-title-thin p-1"> Recent Activity </span>
                        </div>
                    </Container>
                    <Row className="h-100 w-100 my-2 mx-auto">{renderLogs()}</Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminViewClub;
