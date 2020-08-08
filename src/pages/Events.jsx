import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../api/methods";

import Searchbar from "../components/Searchbar";
import NewEventModal from "../components/NewEventModal";
import EventItem from "../components/items/EventItem";

const Events = () => {
    const [eventList, setEventList] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
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

    if (!eventList) return null; // TODO: Add Spinner
    return (
        <Container fluid>
            <Container fluid className="actionbar-container p-4 p-md-5 rounded-lg">
                <div className="actionbar-header mx-md-5 mt-5 pt-3">
                    <span className="actionbar-title clickable p-2" onClick={togglePrevious}>
                        {viewPrevious ? "Previous Events" : "Upcoming Events"}
                    </span>
                    <Button
                        onClick={toggleModal}
                        className="new-btn btn-outline-dark py-2 px-3 my-3"
                    >
                        <span className="d-md-none"> + </span>
                        <span className="d-none d-md-block"> + NEW EVENT </span>
                    </Button>
                </div>
                <Row className="px-4 px-md-0 mx-md-5 mt-5">
                    <Searchbar dataList={eventList} setFilteredList={setFilteredList} />
                </Row>
            </Container>

            <NewEventModal modal={modal} toggleModal={toggleModal} />

            <Container fluid>
                <Row className="pt-5 mx-md-5">
                    {filteredList.map((event) => {
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (viewPrevious ? !isPrevious : isPrevious) return null;
                        return (
                            <Col md="5" lg="4" xl="4" key={event.id} className="my-3">
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
                </Row>
            </Container>
        </Container>
    );
};

export default Events;
