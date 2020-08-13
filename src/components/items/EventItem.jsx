import React, { useState, useEffect } from "react";
import { Alert, Button, Card, CardHeader, CardBody, CardFooter } from "reactstrap";

import EventState from "../EventState";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditEventModal from "../EditEventModal";
import DeleteEventModal from "../DeleteEventModal";
import { formatAudience } from "../../utils/AudienceFormatter";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const EventItem = (props) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [linkAlert, setLinkAlert] = useState(false);
    const [hasLink, setHasLink] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const toggleLinkAlert = () => {
        setLinkAlert(!linkAlert);
        console.log(props.venue);
    };

    const LinkButton = () => {
        return (
            <Button
                color="info"
                onClick={toggleLinkAlert}
                className="link-btn mx-1"
                active={linkAlert}
            >
                <img tag={Button} src="/link-18.svg" alt="L" className="link-icon" />
            </Button>
        );
    };

    useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        const urlPattern = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;
        setHasLink(urlPattern.test(props.venue));
        console.log(urlPattern.test(props.venue));
    }, [props.venue]);

    return (
        <Card className="event-card elevate">
            <EditEventModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteEventModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />
            <CardHeader>
                <div className="event-datetime mb-2">{formatDateTime(props.datetime).datetime}</div>
                <div className="event-name mb-2">{props.name}</div>
                <EventState current={props.state} />
            </CardHeader>
            <CardBody>
                {!hasLink ? (
                    <div className="event-venue mb-2">
                        <span>
                            <img className="card-icon" src="/venue-18.svg" alt="V" />
                        </span>
                        {props.venue}
                    </div>
                ) : null}
                <div className="event-audience mb-2">
                    <span>
                        <img className="card-icon" src="/audience-18.svg" alt="A" />
                    </span>
                    {formatAudience(props.audience)}
                </div>
            </CardBody>
            <CardFooter className="text-right px-2">
                {hasLink ? <LinkButton /> : null}
                {props.modifiable ? (
                    <>
                        <EditButton onClick={toggleEditModal} />
                        <DeleteButton onClick={toggleDeleteModal} />
                    </>
                ) : null}
            </CardFooter>

            <Alert
                color="info"
                isOpen={linkAlert}
                toggle={toggleLinkAlert}
                className="link-alert mx-2"
            >
                {props.venue}
            </Alert>
        </Card>
    );
};

export default EventItem;
