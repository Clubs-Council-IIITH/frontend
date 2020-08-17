import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";
import FailureAlert from "../components/FailureAlert";

const UserForm = (props) => {
    const [failed, setFailed] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
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

        if (res.status === 200) window.location.reload();
        else setFailed(true);
    };

    return (
        <Form id="userform" onSubmit={handleSubmit(onSubmit)}>
            <FailureAlert failed={failed} />
            <FormGroup>
                <Label for="img">Image (as PNG or JPG)</Label>
                <Input
                    invalid={errors.img}
                    type="file"
                    name="img"
                    accept="image/png, image/jpeg, image/jpg"
                    innerRef={register({
                        required: false,
                        validate: (file) => {
                            console.log(file[0].name.substr(file[0].name.lastIndexOf(".") + 1));
                            return file.length === 1
                                ? ["png", "jpg", "jpeg"].includes(
                                      file[0].name.substr(file[0].name.lastIndexOf(".") + 1)
                                  )
                                : false;
                        },
                    })}
                />
                <FormFeedback> Upload only a single valid PNG or JPG/JPEG image! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true, pattern: /^[a-zA-Z,. ]*$/ })}
                />
                <FormFeedback> Invalid user name! </FormFeedback>
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
                    <SubmitButton errors={errors}>Save</SubmitButton>
                </Col>
            </Row>
        </Form>
    );
};

export default UserForm;
