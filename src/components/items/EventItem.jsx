import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";

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

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

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
                <div className="event-venue mb-2">
                    <span>
                        <img className="card-icon" src="/venue-18.svg" alt="V" />
                    </span>
                    {props.venue}
                </div>
                <div className="event-audience mb-2">
                    <span>
                        <img className="card-icon" src="/audience-18.svg" alt="A" />
                    </span>
                    {formatAudience(props.audience)}
                </div>
            </CardBody>
            {props.modifiable ? (
                <CardFooter className="text-right px-2">
                    <EditButton onClick={toggleEditModal} />
                    <DeleteButton onClick={toggleDeleteModal} />
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default EventItem;
