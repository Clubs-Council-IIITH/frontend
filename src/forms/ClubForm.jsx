import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

const ClubForm = (props) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            mail: props.initial.mail,
        },
    });

    const onSubmit = async (data) => {
        var clubForm = document.getElementById("clubform");
        var clubFormData = new FormData(clubForm);

        var res;
        if (props.action === "new") res = await API.new("clubs", clubFormData);
        else res = await API.edit("clubs", props.id, clubFormData);

        // window.location.reload();
    };

    return (
        <Form id="clubform" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Club name can not be empty! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="mail"> E-Mail </Label>
                <Input
                    invalid={errors.role}
                    type="email"
                    name="mail"
                    innerRef={register({ register: true })}
                />
                <FormFeedback> Club mail can not be empty! </FormFeedback>
            </FormGroup>
            <Row className="mt-4">
                <Col className="text-right px-md-4">
                    <Button className="mx-3" onClick={props.cancelAction}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ClubForm;
