import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ProposalForm from "../forms/ProposalForm";

const NewProposalModal = (props) => {
    const [initialData] = useState({
        link: "",
        pdf: "",
    });

    return (
        <Modal
            className="modal-lg"
            isOpen={props.modal}
            backdrop="static"
            toggle={props.toggleModal}
        >
            <ModalHeader> Make a new proposal </ModalHeader>
            <ModalBody>
                <ProposalForm initial={initialData} cancelAction={props.toggleModal} />
            </ModalBody>
        </Modal>
    );
};

export default NewProposalModal;
