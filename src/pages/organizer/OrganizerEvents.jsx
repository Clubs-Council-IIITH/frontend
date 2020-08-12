import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewEventModal from "../../components/NewEventModal";
import EventItem from "../../components/items/EventItem";

const Events = () => {
    const [eventList, setEventList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewPrevious, setViewPrevious] = useState(false);

    useEffect(() => {
        async function getEventList() {
            const res = await API.view("events", {});
            setEventList(res.data);
            setFilteredList(res.data);
        }

        getEventList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const togglePrevious = () => {
        setViewPrevious(!viewPrevious);
    };

    const renderEvents = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Page>
                <Row className="mt-4">
                    {filteredList.map((event) => {
                        // const isPrevious = event.state === "completed" || event.state === "deleted";
                        // if (viewPrevious ? !isPrevious : isPrevious) return null;
                        return (
                            <Col md="6" lg="4" className="my-3" key={event.id}>
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
                        );
                    })}
                </Row>
            </Page>
        );
    };

    return (
        <>
            <SecondaryNavbar page="events" />
            <Page fluid>
                <NewEventModal modal={modal} toggleModal={toggleModal} />
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title clickable p-2" onClick={togglePrevious}>
                            {/* TODO: Properly implement a way to switch between upcoming and previous events*/}
                            {/* {viewPrevious ? "Previous Events" : "Upcoming Events"} */}
                            Events
                        </span>
                        <Button
                            onClick={toggleModal}
                            className="new-btn btn-outline-dark py-2 px-3 my-3"
                        >
                            <span className="d-md-none"> + </span>
                            <span className="d-none d-md-block"> + NEW EVENT </span>
                        </Button>
                    </Page>
                    <Page className="mt-5">
                        <Searchbar
                            className="w-100"
                            dataList={eventList}
                            setFilteredList={setFilteredList}
                        />
                    </Page>
                </Container>
                {renderEvents()}
            </Page>
        </>
    );
};

export default Events;
