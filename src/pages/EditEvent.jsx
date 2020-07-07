import React, { useState, useEffect } from "react";
import { Jumbotron, Container } from "reactstrap";
import { useParams } from "react-router-dom";

import axios from "axios";

import EventForm from "../forms/EventForm";

const EditEvent = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        axios
            .get("/api/organizers/events/edit/" + id + "/", {
                headers: { Authorization: "Token " + localStorage.getItem("token") },
            })
            .then((response) => {
                setInitialData({
                    ...response.data,
                    audience: response.data.audience.split(","),
                });
                setIsLoading(false);
                console.log(initialData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return null; // TODO: Loading Spinner
    }

    return (
        <React.Fragment>
            <Container>
                <Jumbotron>
                    <EventForm
                        action="/api/organizers/events/edit/"
                        id={id}
                        initial={initialData}
                    />
                </Jumbotron>
            </Container>
        </React.Fragment>
    );
};

export default EditEvent;
