import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import API from "../api/methods";

import EventForm from "../forms/EventForm";

const EditEventModal = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        async function getInitialData() {
            const res = await API.view("events", { id: props.id });
            setInitialData({ ...res.data[0], audience: res.data[0].audience.split(",") });
            setIsLoading(false);
        }

        if (props.id !== 0) getInitialData();
    }, [props.id]);

    if (isLoading || props.id === 0) return null;
    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            backdrop="static"
            toggle={props.toggleModal}
        >
            <ModalHeader className="common-modal text-uppercase"> Edit event </ModalHeader>
            <ModalBody>
                <EventForm
                    action="edit"
                    id={props.id}
                    initial={initialData}
                    cancelAction={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    );
};

export default EditEventModal;
