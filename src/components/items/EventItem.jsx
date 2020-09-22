import React, { useState } from "react";
import { Card, CardHeader, CardFooter } from "reactstrap";

import EventState from "../EventState";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import ViewEventModal from "../ViewEventModal";
import EditEventModal from "../EditEventModal";
import DeleteEventModal from "../DeleteEventModal";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const EventItem = (props) => {
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleViewModal = () => {
        setViewModal(!viewModal);
    };

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return (
        <Card className="event-card elevate clickable">
            <ViewEventModal modal={viewModal} toggleModal={toggleViewModal} instance={props} />
            <EditEventModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteEventModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />
            <CardHeader className="mb-2" onClick={toggleViewModal}>
                <div className="event-datetime my-2">{formatDateTime(props.datetime).datetime}</div>
                <div className="event-name mb-2">{props.name}</div>
            </CardHeader>

            <CardFooter className="d-flex flex-row justify-content-between">
                {props.modifiable ? (
                    <>
                        <EventState current={props.state} />
                        <div className="text-right mx-n2">
                            <EditButton onClick={toggleEditModal} />
                            <DeleteButton onClick={toggleDeleteModal} />
                        </div>
                    </>
                ) : (
                    <div
                        className="view-event-indicator text-uppercase text-center w-100 font-weight-bold p-2 mb-2"
                        onClick={toggleViewModal}
                    >
                        View
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default EventItem;
