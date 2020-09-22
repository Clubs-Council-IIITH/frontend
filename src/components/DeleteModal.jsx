import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Input,
    Form,
    FormGroup,
    FormFeedback,
} from "reactstrap";

import API from "../api/methods";

import FailureAlert from "../components/FailureAlert";

const DeleteClubModal = (props) => {
    const [failed, setFailed] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            creator: "",
        },
    });

    const onDelete = async (data) => {
        const res = await API.delete(props.target, props.id, data);

        if (res.status === 200) window.location.reload(false);
        else setFailed(true);
    };

    if (props.id === 0) return null;
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <FailureAlert failed={failed} />
            <ModalHeader className="common-modal">
                Are you sure you want to delete{" "}
                <span className="font-weight-bold">'{props.name}'</span>?
            </ModalHeader>
            <ModalBody>
                <div>Type your name to confirm. </div>
                <Form id="deleteform" onSubmit={handleSubmit(onDelete)} autoComplete="off">
                    <FormGroup className="mt-4">
                        <Input
                            autocomplete="off"
                            invalid={errors.creator}
                            type="text"
                            name="creator"
                            innerRef={register({ required: true, pattern: /^[a-zA-Z,. ]*$/ })}
                        />
                        <FormFeedback> Your name is required! </FormFeedback>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter className="text-right">
                <Button className="mx-2 common-btn text-uppercase" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button
                    className="mx-2 common-btn text-uppercase"
                    color="danger"
                    form="deleteform"
                    type="submit"
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteClubModal;
