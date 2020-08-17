import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";
import FailureAlert from "../components/FailureAlert";
import { assertFiletype } from "../utils/FileUtils";

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
            <FailureAlert failed={failed} />
            <FormGroup>
                <Label for="link"> Working Draft Link </Label>
                <Input type="text" name="link" innerRef={register({ required: true })} />
            </FormGroup>
            <FormGroup>
                <Label for="pdf">PDF</Label>
                <Input
                    invalid={errors.pdf}
                    type="file"
                    name="pdf"
                    accept="application/pdf,.pdf"
                    innerRef={register({
                        required: false,
                        validate: (file) => assertFiletype(file, ["pdf"]),
                    })}
                />
                <FormFeedback> Upload only a single valid PDF! </FormFeedback>
            </FormGroup>
            <Row className="mt-4">
                <Col className="text-right px-md-4">
                    <Button className="mx-3 common-btn text-uppercase" onClick={props.cancelAction}>
                        Cancel
                    </Button>
                    <SubmitButton errors={errors}>Save</SubmitButton>
                </Col>
            </Row>
        </Form>
    );
};

export default ProposalForm;
