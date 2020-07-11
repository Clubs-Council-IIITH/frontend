import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import EventForm from "../forms/EventForm";

const NewEventModal = (props) => {
    const [initialData] = useState({
        name: "",
        creator: "",
        datetime: "",
        venue: "",
        audience: "",
        state: "",
    });

    return (
        <React.Fragment>
            <Modal isOpen={props.modal} toggle={props.toggleModal}>
                <ModalHeader> Create a new event </ModalHeader>
                <ModalBody>
                    <EventForm action="/api/events/new" id="" initial={initialData} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default NewEventModal;
