import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import UpdateForm from "../forms/UpdateForm";

const NewUpdateModal = (props) => {
    const [initialData] = useState({
        title: "",
        content: "",
        creator: "",
    });

    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            toggle={props.toggleModal}
            autoFocus={false}
        >
            <ModalHeader className="common-modal text-uppercase"> Post a new update </ModalHeader>
            <ModalBody>
                <UpdateForm
                    action="new"
                    id=""
                    initial={initialData}
                    cancelAction={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    );
};

export default NewUpdateModal;
