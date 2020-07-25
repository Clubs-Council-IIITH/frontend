import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Jumbotron, Container } from "reactstrap";

import API from "../api/methods";

import EventForm from "../forms/EventForm";

const EditEvent = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        async function getInitialData() {
            const res = await API.view("events", { id: id });
            setInitialData({ ...res.data[0], audience: res.data[0].audience.split(",") });
            setIsLoading(false);
        }

        getInitialData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return null; // TODO: Loading Spinner
    return (
        <React.Fragment>
            <Container>
                <Jumbotron>
                    <EventForm action="edit" id={id} initial={initialData} />
                </Jumbotron>
            </Container>
        </React.Fragment>
    );
};

export default EditEvent;
