import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";

const ProposalForm = (props) => {
    const [failed, setFailed] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            link: props.initial.link,
            pdf: props.initial.pdf,
        },
    });

    const onSubmit = async (data) => {
        var proposalForm = document.getElementById("proposalform");
        var proposalFormData = new FormData(proposalForm);

        var res = await API.new("budget/proposals", proposalFormData);

        if (res.status === 200) window.location.reload();
        else setFailed(true);
    };

    return (
        <Form id="proposalform" onSubmit={handleSubmit(onSubmit)}>
            {failed ? (
                <Alert color="danger"> Something went wrong! Try again in a while.</Alert>
            ) : null}
            <FormGroup>
                <Label for="link"> Working Draft Link </Label>
                <Input type="text" name="link" innerRef={register({ required: true })} />
            </FormGroup>
            <FormGroup>
                <Label for="pdf">PDF</Label>
                <Input type="file" name="pdf" innerRef={register({ required: false })} />
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

export default ProposalForm;
