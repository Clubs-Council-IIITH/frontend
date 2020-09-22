import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, InputGroup, Input, InputGroupAddon, Container, Button, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminTabBar from "./AdminTabBar";
import Transition from "../../components/TransitionContainer";
import BackButton from "../../components/buttons/BackButton";
import Searchbar from "../../components/Searchbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import EventItem from "../../components/items/EventItem";
import UserItem from "../../components/items/UserItem";
import LogItem from "../../components/items/LogItem";
import ProposalItem from "../../components/items/ProposalItem";
import { isSameDay, formatDateTime } from "../../utils/DateTimeFormatter";

const AdminViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [logs, setLogs] = useState(false);
    const [users, setUsers] = useState(false);
    const [events, setEvents] = useState(false);
    const [proposals, setProposals] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [tab, setTab] = useState("events");

    useEffect(() => {
        async function getClub() {
            const club_res = await API.view("clubs", { id: props.match.params.id });
            setClub(club_res.data[0]);
            const users_res = await API.view("coordinators", { club: props.match.params.id });
            setUsers(users_res.data);
        }

        async function getData() {
            const events_res = await API.view("events", { club: props.match.params.id });
            setEvents(events_res.data);
            setFilteredList(events_res.data);
            const logs_res = await API.view("logs", { club: props.match.params.id });
            setLogs(logs_res.data);
        }

        async function getProposals() {
            const res = await API.view("budget/proposals", { club: props.match.params.id });
            setProposals(res.data);
        }

        getClub();
        getData();
        getProposals();
    }, []); // eslint-disable-line

    const renderMembers = () => {
        if (!users) return <LoadingIndicator />;
        if (users.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {users.map((user) => (
                        <Col md="4" lg="3" className="my-3 user-card" key={user.id}>
                            <UserItem
                                {...user}
                                role={user.roles.filter((role) => role[0] == club.id)[0][1]} // eslint-disable-line
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    const renderEvents = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((event) => {
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (isPrevious) return null;
                        return (
                            <Col md="6" xl="4" className="my-3" key={event.id}>
                                <EventItem modifiable {...event} />
                            </Col>
                        );
                    })}
                </Row>
                <Row className="mt-4">
                    {filteredList.map((event) => {
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (!isPrevious) return null;
                        return (
                            <Col md="6" xl="4" className="my-3" key={event.id}>
                                <EventItem {...event} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    };

    const renderLogs = () => {
        if (!logs) return <LoadingIndicator />;
        if (logs.length === 0) return <NullIndicator />;
        var prevDate = logs[0].datetime;
        logs[0]["datebreak"] = true;
        logs.forEach(function (log) {
            if (!isSameDay(prevDate, log.datetime)) {
                log["datebreak"] = true;
                prevDate = log.timestamp;
            }
        });

        return (
            <Container fluid>
                <div className="mt-4">
                    {console.log(logs)}
                    {logs.map((log) => (
                        <Col md="12" className="my-1">
                            <LogItem
                                datetime={log.datetime}
                                creator={log.actor}
                                action={log.action}
                                event={log.event[0]["name"]}
                                datebreak={log.datebreak}
                            />
                        </Col>
                    ))}
                </div>
            </Container>
        );
    };

    const renderProposals = () => {
        if (!proposals) return <LoadingIndicator />;
        if (proposals.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    <Col className="mt-3">
                        <Alert color="success" className="proposal-alert p-4">
                            <div className="proposal-alert-header mb-2 text-uppercase">
                                Current Proposal
                            </div>
                            <div className="proposal-alert-datetime">
                                {formatDateTime(proposals[0].datetime).datetime}
                            </div>
                            <Row>
                                <Col lg="9" className="proposal-alert-link mt-3">
                                    <InputGroup>
                                        <Input
                                            bsSize="lg"
                                            type="text"
                                            value={proposals[0].link}
                                            readonly
                                        />
                                        <InputGroupAddon
                                            addonType="append"
                                            className="proposal-link-btn"
                                        >
                                            <Button
                                                color="success"
                                                className="common-btn"
                                                onClick={() =>
                                                    window.open(proposals[0].link, "_blank")
                                                }
                                            >
                                                <img
                                                    src="/open-18.svg"
                                                    className="btn-icon mb-1 mr-1"
                                                    alt="O"
                                                />
                                                <span> OPEN </span>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col className="proposal-alert-pdf mt-3">
                                    <Button
                                        color="danger"
                                        size="lg"
                                        tag={Link}
                                        target="_blank"
                                        to={proposals[0].pdf}
                                        className="common-btn w-100"
                                    >
                                        <img
                                            src="/view-18.svg"
                                            className="btn-icon mb-1 mr-1"
                                            alt="V"
                                        />
                                        <span> VIEW PDF </span>
                                    </Button>
                                </Col>
                            </Row>
                        </Alert>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {proposals.slice(1).map((proposal) => (
                        <Col md="6" xl="4" className="my-3" key={proposal.id}>
                            <ProposalItem {...proposal} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    const renderTabBar = () => {
        const buttonList = [
            { text: "events", tab: "events", icon: "/events-18.svg" },
            { text: "activity", tab: "activity", icon: "/activity-18.svg" },
            { text: "members", tab: "members", icon: "/audience-18.svg" },
            { text: "budget", tab: "budget", icon: "/budget-18.svg" },
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
                        <span className="d-md-none">
                            <img
                                src={button.icon}
                                alt={button.text}
                                className={"nav-btn-icon" + (tab === button.tab ? "-active" : "")}
                            />
                        </span>
                        <span className="d-none d-md-block">{button.text}</span>
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
            case "budget":
                return renderProposals();
            default:
                return null;
        }
    };

    return (
        <>
            <AdminTabBar />
            <Transition>
                <Container fluid className="actionbar-container rounded-lg">
                    <Row>
                        <Col xs="3" sm="1" className="my-auto">
                            <BackButton />
                        </Col>
                        <Col className="viewclub-title my-auto pt-2">{club.name}</Col>
                    </Row>
                </Container>
                <Container fluid className="mt-4 mt-md-5">
                    <Row>
                        <Col lg className="my-auto">
                            {renderTabBar()}
                        </Col>
                        <Col className="my-auto py-3 py-lg-0">
                            {tab === "events" ? (
                                <Searchbar dataList={events} setFilteredList={setFilteredList} />
                            ) : null}
                        </Col>
                    </Row>
                </Container>
                <Row className="p-0">
                    <Col>{renderTab()}</Col>
                </Row>
            </Transition>
        </>
    );
};

export default AdminViewClub;
