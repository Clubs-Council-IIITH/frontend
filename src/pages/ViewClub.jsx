import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../api/methods";

import Transition from "../components/TransitionContainer";
import BackButton from "../components/buttons/BackButton";
import Searchbar from "../components/Searchbar";
import LoadingIndicator from "../components/LoadingIndicator";
import NullIndicator from "../components/NullIndicator";
import EventItem from "../components/items/EventItem";
import UserItem from "../components/items/UserItem";

const ViewClub = (props) => {
    const [club, setClub] = useState(false);
    const [users, setUsers] = useState(false);
    const [events, setEvents] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [tab, setTab] = useState("events");

    useEffect(() => {
        async function getClub() {
            const club_res = await API.view("clubs", { id: props.match.params.id });
            setClub(club_res.data[0]);
            const users_res = await API.view("coordinators", { club: props.match.params.id });
            setUsers(users_res.data);
        }

        async function getEvents() {
            const events_res = await API.view("events", { club: props.match.params.id });
            setEvents(events_res.data);
            setFilteredList(events_res.data);
        }

        getClub();
        getEvents();
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
                                mail=""
                                mobile=""
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
        var activeEventsList = filteredList.filter((event) =>
            ["approved", "published", "scheduled"].includes(event.state)
        );
        if (activeEventsList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {activeEventsList.map((event) => (
                        <Col md="6" lg="4" className="my-3" key={event.id}>
                            <EventItem {...event} state="" />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    const renderTabBar = () => {
        const buttonList = [
            { text: "events", tab: "events" },
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
            case "members":
                return renderMembers();
            default:
                return null;
        }
    };

    return (
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
                    <Col md className="my-auto">
                        {renderTabBar()}
                    </Col>
                    <Col className="my-auto py-3 py-md-0">
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
    );
};

export default ViewClub;
