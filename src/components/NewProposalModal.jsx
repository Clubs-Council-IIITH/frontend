import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import API from "../api/methods";

import LoadingIndicator from "./LoadingIndicator";
import ProposalForm from "../forms/ProposalForm";

const NewProposalModal = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({
        link: "",
        pdf: "",
    });

    useEffect(() => {
        async function getInitialData() {
            const res = await API.view("budget/proposals");
            if (res.data.length > 0) setInitialData({ link: res.data[0].link, pdf: "" });
            setIsLoading(false);
        }

        if (props.id !== 0) getInitialData();
    }, [props.id]);

    if (isLoading) return <LoadingIndicator />;
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
