import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import EventItem from "../../components/items/EventItem";
import Transition from "../../components/TransitionContainer";

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

    return (
        <ClubNavigation match={props.match}>
            <Transition>{renderEvents()}</Transition>
        </ClubNavigation>
    );
};

export default ClubEvents;
