import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";
import FailureAlert from "../components/FailureAlert";

const UpdateForm = (props) => {
    const [APIerror, setAPIError] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            title: props.initial.title,
            content: props.initial.content,
        },
    });

    const onSubmit = async (data) => {
        var updateForm = document.getElementById("updateform");
        var updateFormData = new FormData(updateForm);

        var res;
        if (props.action === "new") res = await API.new("updates", updateFormData);
        else res = await API.edit("updates", props.id, updateFormData);

        if (res.status === 200) window.location.reload();
        else setAPIError(res.data);
    };

    return (
        <Form id="updateform" onSubmit={handleSubmit(onSubmit)}>
            <FailureAlert error={APIerror} />
            <FormGroup>
                <Label for="title"> Title </Label>
                <Input
                    invalid={errors.title}
                    type="text"
                    name="title"
                    innerRef={register({ required: true })}
                    autoFocus
                />
                <FormFeedback> You need to provide a title! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="content"> Content </Label>
                <Input
                    invalid={errors.content}
                    type="textarea"
                    name="content"
                    rows="6"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> You need to provide some update content! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="creator"> Your name? </Label>
                <Input
                    invalid={errors.creator}
                    type="text"
                    name="creator"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Your name is required! </FormFeedback>
            </FormGroup>
            <Row className="mt-4">
                <Col className="text-right px-md-4">
                    <Button className="mx-3 common-btn text-uppercase" onClick={props.cancelAction}>
                        Cancel
                    </Button>
                    <SubmitButton APIerror={APIerror} errors={errors}>
                        Save
                    </SubmitButton>
                </Col>
            </Row>
        </Form>
    );
};

export default UpdateForm;
