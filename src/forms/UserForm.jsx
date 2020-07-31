import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

const UserForm = (props) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            role: props.initial.role,
            mail: props.initial.mail,
            mobile: props.initial.mobile,
        },
    });

    const onSubmit = async (data) => {
        var userForm = document.getElementById("userform");
        var userFormData = new FormData(userForm);

        var res;
        if (props.action === "new") res = await API.new("coordinators", userFormData);
        else res = await API.edit("coordinators", props.id, userFormData);

        window.location.reload();
    };

    return (
        <Form id="userform" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> User name can not be empty! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="role"> Role </Label>
                <Input
                    invalid={errors.role}
                    type="text"
                    name="role"
                    innerRef={register({ register: true })}
                />
                <FormFeedback> Invalid role! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="mail"> E-Mail </Label>
                <Input
                    invalid={errors.mail}
                    type="email"
                    name="mail"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Invalid E-Mail address! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="mobile"> Mobile Number </Label>
                <Input
                    invalid={errors.mobile}
                    type="number"
                    name="mobile"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Invalid mobile number! </FormFeedback>
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

export default UserForm;
