import React, { useState, useCallback } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import API from "../api/methods";

import FailureAlert from "../components/FailureAlert";

const DeleteClubModal = (props) => {
    const [failed, setFailed] = useState(false);

    const handleDelete = useCallback(async () => {
        const res = await API.delete(props.target, props.id);

        if (res.status === 200) window.location.reload(false);
        else setFailed(true);
    }, [props.target, props.id]);

    if (props.id === 0) return null;
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <FailureAlert failed={failed} />
            <ModalHeader className="common-modal">
                Are you sure you want to delete{" "}
                <span className="font-weight-bold">'{props.name}'</span>?
            </ModalHeader>
            <ModalBody className="text-right">
                <Button className="mx-2 common-btn text-uppercase" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button
                    className="mx-2 common-btn text-uppercase"
                    color="danger"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </ModalBody>
        </Modal>
    );
};

export default DeleteClubModal;
