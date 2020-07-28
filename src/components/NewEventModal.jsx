import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import EventForm from "../forms/EventForm";

const NewEventModal = (props) => {
    const [initialData] = useState({
        name: "",
        datetime: "",
        venue: "",
        audience: "",
        state: "created",
    });

    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            backdrop="static"
            toggle={props.toggleModal}
        >
            <ModalHeader> Create a new event </ModalHeader>
            <ModalBody>
                <EventForm
                    action="new"
                    id=""
                    initial={initialData}
                    cancelAction={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    );
};

export default NewEventModal;
