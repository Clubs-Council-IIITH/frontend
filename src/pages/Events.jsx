import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";

import API from "../api/methods";

import NewEventModal from "../components/NewEventModal";
import EventItem from "../components/items/EventItem";

const Events = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [modal, setModal] = useState(false);
    const [viewPrevious, setViewPrevious] = useState(false);

    useEffect(() => {
        async function getEventList() {
            const res = await API.view("events", {});
            setEventList(res.data);
            setIsLoading(false);
        }

        getEventList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const togglePrevious = () => {
        setViewPrevious(!viewPrevious);
    };

    if (isLoading) return null; // TODO: Add Spinner
    return (
        <React.Fragment>
            <div className="container-fluid pt-5">
                <NewEventModal modal={modal} toggleModal={toggleModal} />
                <div className="event-header mx-3 mx-md-4 mt-4">
                    <span className="event-title p-2" onClick={togglePrevious}>
                        {viewPrevious ? "Previous Events" : "Upcoming Events"}
                    </span>
                    <Button
                        onClick={toggleModal}
                        className="eventnew-btn body-btn btn-outline-dark py-2 px-3 my-3 mx-md-3"
                    >
                        <span className="d-md-none"> + </span>
                        <span className="d-none d-md-block"> + NEW EVENT </span>
                    </Button>
                </div>
                <Row id="event-row" className="h-100 pt-4 mb-3 mx-1 m-md-3">
                    {eventList.map((event) => {
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (viewPrevious ? !isPrevious : isPrevious) return null;
                        return (
                            <Col md="5" lg="4" xl="3" key={event.id} className="my-3">
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
            </div>
        </React.Fragment>
    );
};

export default Events;
