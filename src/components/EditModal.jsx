import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const EditModal = (props) => {
    if (props.id === 0) return null;
    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            toggle={props.toggleModal}
            autoFocus={false}
        >
            <ModalHeader className="common-modal text-uppercase"> Edit {props.text} </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
        </Modal>
    );
};

export default EditModal;
