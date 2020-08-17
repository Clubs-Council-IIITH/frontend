import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ClubForm from "../forms/ClubForm";

const NewClubModal = (props) => {
    const [initialData] = useState({
        name: "",
        mail: "",
    });

    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            backdrop="static"
            toggle={props.toggleModal}
        >
            <ModalHeader className="common-modal text-uppercase"> Create a new club </ModalHeader>
            <ModalBody>
                <ClubForm
                    action="new"
                    id=""
                    initial={initialData}
                    cancelAction={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    );
};

export default NewClubModal;
