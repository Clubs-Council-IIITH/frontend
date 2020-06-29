import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import axios from "axios";

import NewEventModal from "../components/NewEventModal";
import EventItem from "../components/EventItem";
import { parseAudience } from "../helpers/EventAudienceParser";

const Events = () => {
    const [eventList, setEventList] = useState([]);
    const [modal, setModal] = useState(false);
    const [viewPrevious, setViewPrevious] = useState(false);

    useEffect(() => {
        axios
            .get("/api/organizers/events", {
                headers: { Authorization: "Token " + localStorage.getItem("token") },
            })
            .then((response) => {
                setEventList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const togglePrevious = () => {
        setViewPrevious(!viewPrevious);
    };

    const horizontalScroll = (e) => {
        if (window.screen.width >= 768) {
            e.preventDefault();
            const delta = Math.max(
                -1,
                Math.min(1, e.nativeEvent.wheelDelta || -e.nativeEvent.detail)
            );
            e.currentTarget.scrollLeft -= delta * 50;
        }
    };

    return (
        <React.Fragment>
            <div className="container-fluid event-container pt-5">
                <NewEventModal modal={modal} toggleModal={toggleModal} />
                <div className="event-header mx-md-4 mt-4">
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
                <div
                    id="event-row"
                    className="row event-row h-100 mt-4 pb-3 my-3 mx-md-1"
                    onWheel={horizontalScroll}
                >
                    {eventList.map((event) => {
                        const isPrevious = event.state === "completed" || event.state === "deleted";
                        if (viewPrevious ? !isPrevious : isPrevious) return null;
                        return (
                            <EventItem
                                key={event.id}
                                id={event.id}
                                audience={event.audience.split(",").map(parseAudience).join(", ")}
                                name={event.name}
                                datetime={event.datetime}
                                venue={event.venue}
                                creator={event.creator}
                                state={event.state}
                            />
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Events;
