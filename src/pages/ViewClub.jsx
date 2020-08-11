import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../api/methods";

import Page from "../components/PageContainer";
import BackButton from "../components/buttons/BackButton";
import Searchbar from "../components/Searchbar";
import EventItem from "../components/items/EventItem";
import UserItem from "../components/items/UserItem";

const ViewClub = (props) => {
    const [club, setClub] = useState(false);
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

        async function getEvents() {
            const events_res = await API.view("events", { club: props.match.params.id });
            setEvents(events_res.data);
            setFilteredList(events_res.data);
        }

        getClub();
        getEvents();
    }, []); // eslint-disable-line

    const togglePrevious = () => {
        setViewPrevious(!viewPrevious);
    };

    const renderMembers = () => {
        if (!users) return <></>; // TODO: Add Loading Spinner
        return (
            <Row className="mt-4">
                {users.map((user) => (
                    <Col xs="6" sm="4" lg="3" xl="2" key={user.id} className="py-3 user-card">
                        <UserItem
                            id={user.id}
                            img={user.img}
                            name={user.name}
                            role={user.roles.filter((role) => role[0] == club.id)[0][1]}
                        />
                    </Col>
                ))}
            </Row>
        );
    };

    const renderEvents = () => {
        if (!events) return <></>; // TODO: Add Loading Spinner
        return (
            <Row className="mt-4">
                {filteredList.map((event) => (
                    <Col md="2" lg="3" xl="4" key={event.id} className="my-3">
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
                ))}
            </Row>
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
        <Page>
            <Container fluid className="actionbar-container p-4 p-md-5 rounded-lg">
                <div className="viewclub-header mx-md-3 mt-0 pt-0">
                    <BackButton />
                    <span className="viewclub-title p-2 my-auto">{club.name}</span>
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
        </Page>
    );
};

export default ViewClub;
