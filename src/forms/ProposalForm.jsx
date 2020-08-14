import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

const ProposalForm = (props) => {
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

        window.location.reload();
    };

    return (
        <Form id="proposalform" onSubmit={handleSubmit(onSubmit)}>
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
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ProposalForm;
