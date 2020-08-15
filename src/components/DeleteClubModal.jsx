import React, { useCallback } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import API from "../api/methods";

const DeleteClubModal = (props) => {
    const handleDelete = useCallback(async () => {
        const res = await API.delete("clubs", props.id);
        window.location.reload(false);
    }, [props.id]);

    if (props.id === 0) return null; // TODO: Loading Spinner
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <ModalHeader> Are you sure you want to delete '{props.name}'? </ModalHeader>
            <ModalBody className="text-right">
                <Button className="mx-2" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button className="mx-2" color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </ModalBody>
        </Modal>
    );
};

export default DeleteClubModal;
