import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import NewEventModal from "../../components/NewEventModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import EventItem from "../../components/items/EventItem";
import Transition from "../../components/TransitionContainer";
import Searchbar from "../../components/Searchbar";

const ClubEvents = (props) => {
    const [events, setEvents] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getEvents() {
            const events_res = await API.view("events", { club: props.match.params.id });
            setEvents(events_res.data);
            setFilteredList(events_res.data);
        }
        getEvents();
    }, [props.match.params.id]);

    const renderEvents = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;

        var upcomingList = filteredList.filter(
            (event) => !["completed", "deleted"].includes(event.state)
        );

        var previousList = filteredList.filter((event) => !upcomingList.includes(event));
        previousList.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        return (
            <Container fluid className="mt-2 mt-md-5">
                {upcomingList.length ? (
                    <>
                        <div className="event-category-banner mt-5 mt-md-0"> UPCOMING </div>
                        <Row className="mb-4">
                            {upcomingList.map((event) => {
                                return (
                                    <Col md="6" xl="4" className="d-flex my-3" key={event.id}>
                                        <EventItem modifiable {...event} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </>
                ) : null}

                {previousList.length ? (
                    <>
                        <div className="event-category-banner mt-5 mt-md-0"> PREVIOUS </div>
                        <Row>
                            {previousList.map((event) => {
                                return (
                                    <Col md="6" xl="4" className="d-flex my-3" key={event.id}>
                                        <EventItem modifiable {...event} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </>
                ) : null}
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
            <NewEventModal modal={props.modal} toggleModal={props.toggleModal} />
            <Transition>
                <Row className="mt-4 mt-md-5">
                    <Col className="mx-3">
                        <Searchbar
                            className="w-100"
                            dataList={events}
                            setFilteredList={setFilteredList}
                            searchAttr={(obj) => obj.name}
                        />
                    </Col>
                </Row>
                {renderEvents()}
            </Transition>
        </ClubNavigation>
    );
};

export default ClubEvents;
