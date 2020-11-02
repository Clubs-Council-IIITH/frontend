import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";
import FailureAlert from "../components/FailureAlert";

const ClubForm = (props) => {
    const [APIerror, setAPIError] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            mail: props.initial.mail,
            website: props.initial.website,
        },
    });

    const onSubmit = async (data) => {
        var clubForm = document.getElementById("clubform");
        var clubFormData = new FormData(clubForm);

        var res;
        if (props.action === "new") res = await API.new("clubs", clubFormData);
        else res = await API.edit("clubs", props.id, clubFormData);

        if (res.status === 200) window.location.reload();
        else setAPIError(res.data);
    };

    return (
        <Form id="clubform" onSubmit={handleSubmit(onSubmit)}>
            <FailureAlert error={APIerror} />
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true, pattern: /^[a-zA-Z ,.'-]*$/ })}
                    autoFocus
                />
                <FormFeedback> Invalid club name! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="mail"> E-Mail </Label>
                <Input
                    invalid={errors.mail}
                    type="email"
                    name="mail"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Club mail can not be empty! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="website"> Website Link </Label>
                <Input
                    invalid={errors.website}
                    type="text"
                    name="website"
                    innerRef={register({ required: false })}
                />
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

export default ClubForm;
