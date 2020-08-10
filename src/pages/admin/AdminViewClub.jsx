import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../../api/methods";

import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import EventItem from "../../components/items/EventItem";
import UserItem from "../../components/items/UserItem";
import LogItem from "../../components/items/LogItem";
import { isSameDay } from "../../utils/DateTimeFormatter";

const AdminViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [logs, setLogs] = useState(false);
    const [users, setUsers] = useState(false);
    const [events, setEvents] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [viewPrevious, setViewPrevious] = useState(false);
    const [tab, setTab] = useState("events");

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

    const renderMembers = () => {
        if (!users) return null;
        return (
            <div className="mt-4">
                {users.map((user) => (
                    <Col xs="6" sm="4" lg="3" xl="2" key={user.id} className="py-3 user-card">
                        <UserItem
                            modifiable
                            id={user.id}
                            img={user.img}
                            name={user.name}
                            role={user.roles.filter((role) => role[0] == club.id)[0][1]}
                            mail={user.mail}
                            mobile={user.mobile}
                        />
                    </Col>
                ))}
            </div>
        );
    };

    const renderEvents = () => {
        if (!events) return null;
        return (
            <div className="mt-4">
                {filteredList.map((event) => (
                    <Col md="2" lg="4" xl="3" key={event.id} className="my-3">
                        <EventItem
                            modifiable
                            id={event.id}
                            audience={event.audience}
                            name={event.name}
                            datetime={event.datetime}
                            venue={event.venue}
                            creator={event.creator}
                            state={event.state}
                        />
                    </Col>
                ))}
            </div>
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
            <div className="mt-4">
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
            </div>
        );
    };

    const renderTabBar = () => {
        const buttonList = [
            { text: "events", tab: "events" },
            { text: "activity", tab: "activity" },
            { text: "members", tab: "members" },
        ];

        return (
            <div className="tab-nav p-2">
                {buttonList.map((button) => (
                    <Button
                        onClick={() => setTab(button.tab)}
                        className={
                            "text-uppercase mx-1 py-2 nav-btn" +
                            (tab === button.tab ? "-active" : "")
                        }
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        );
    };

    const renderTab = () => {
        switch (tab) {
            case "events":
                return renderEvents();
            case "activity":
                return renderLogs();
            case "members":
                return renderMembers();
            default:
                return null;
        }
    };

    return (
        <Container fluid>
            <SecondaryNavbar page="clubs" />
            <Container fluid className="actionbar-container p-4 p-md-5 rounded-lg">
                <div className="actionbar-header mx-md-5 mt-0 pt-0">
                    <span className="actionbar-title p-2">{club.name}</span>
                </div>
            </Container>
            <Row className="px-4 px-md-0 mx-md-2 mt-4">
                <Col md className="my-auto px-0">
                    {renderTabBar()}
                </Col>
                <Col className="my-auto py-3 py-md-0">
                    {tab === "events" ? (
                        <Searchbar dataList={events} setFilteredList={setFilteredList} />
                    ) : null}
                </Col>
            </Row>
            <Row className="p-0">
                <Col>{renderTab()}</Col>
            </Row>
        </Container>
    );
};

export default AdminViewClub;
