import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import UserForm from "../forms/UserForm";

const NewUserModal = (props) => {
    const [initialData] = useState({
        name: "",
        mail: "",
        mobile: "",
    });

    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            backdrop="static"
            toggle={props.toggleModal}
        >
            <ModalHeader> Create a new user </ModalHeader>
            <ModalBody>
                <UserForm
                    action="new"
                    id=""
                    initial={initialData}
                    cancelAction={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    );
};

export default NewUserModal;
