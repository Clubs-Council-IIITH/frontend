import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import Searchbar from "../../components/Searchbar";
import NewButton from "../../components/buttons/NewButton";
import Transition from "../../components/TransitionContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewEventModal from "../../components/NewEventModal";
import EventItem from "../../components/items/EventItem";

const OrganizerEvents = () => {
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
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (isPrevious) return null;
                        return (
                            <Col md="6" lg="4" className="my-3" key={event.id}>
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
                            <Col md="6" lg="4" className="my-3" key={event.id}>
                                <EventItem {...event} />
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
            <Transition>
                <NewEventModal modal={modal} toggleModal={toggleModal} />
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title clickable p-2" onClick={togglePrevious}>
                            {/* TODO: Properly implement a way to switch between upcoming and previous events*/}
                            {/* {viewPrevious ? "Previous Events" : "Upcoming Events"} */}
                            Events
                        </span>
                        <NewButton onClick={toggleModal} text="event" />
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
            </Transition>
        </>
    );
};

export default OrganizerEvents;
