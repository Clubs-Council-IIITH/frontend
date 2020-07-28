import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import API from "../api/methods";

const EventForm = (props) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            creator: "",
            datetime: props.initial.datetime,
            venue: props.initial.venue,
            audience: props.initial.audience,
            state: props.initial.state,
        },
    });

    const onSubmit = async (data) => {
        var eventForm = document.getElementById("eventform");
        var eventFormData = new FormData(eventForm);
        eventFormData.set("audience", data.audience.toString());

        var res;
        if (props.action === "new") res = await API.new("events", eventFormData);
        else res = await API.edit("events", props.id, eventFormData);

        window.location.reload();
    };

    return (
        <Form id="eventform" onSubmit={handleSubmit(onSubmit)}>
            <Row form>
                <Col md="6" className="px-md-3">
                    <FormGroup>
                        <Label for="name"> Name </Label>
                        <Input type="text" name="name" innerRef={register({ required: true })} />
                        {errors.ename && <p> Name can not be empty! </p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="datetime"> DateTime </Label>
                        <Input
                            type="text"
                            name="datetime"
                            innerRef={register({ required: true })}
                        />
                        {errors.ename && <p> Invalid datetime! </p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="venue"> Venue </Label>
                        <Input
                            type="textarea"
                            name="venue"
                            rows="4"
                            innerRef={register({ required: true })}
                        />
                        {errors.ename && <p> Venue can not be empty! </p>}
                    </FormGroup>
                </Col>
                <Col md="6" className="px-md-3">
                    <FormGroup>
                        <Label for="audience"> Audience </Label>
                        <Input
                            type="select"
                            name="audience"
                            multiple
                            innerRef={register({ required: true })}
                        >
                            <option value="ug1"> UG 1 </option>
                            <option value="ug2"> UG 2 </option>
                            <option value="ug3"> UG 3 </option>
                            <option value="ugx"> UG 4+ </option>
                            <option value="pg"> PG </option>
                            <option value="staff"> Staff </option>
                            <option value="faculty"> Faculty </option>
                        </Input>
                    </FormGroup>
                    {props.action === "new" ? null : (
                        <FormGroup>
                            <Label for="state"> State </Label>
                            <Input
                                type="select"
                                name="state"
                                innerRef={register({ required: true })}
                            >
                                <option value="created"> CREATED </option>
                                <option value="approved"> APPROVED </option>
                                <option value="published"> PUBLISHED </option>
                                <option value="scheduled"> SCHEDULED </option>
                                <option value="completed"> COMPLETED </option>
                                <option value="deleted"> DELETED </option>
                            </Input>
                        </FormGroup>
                    )}
                    <FormGroup className="mt-4">
                        <Label for="creator"> Your name? </Label>
                        <Input type="text" name="creator" innerRef={register({ required: true })} />
                        {errors.ename && <p> Your name can not be empty! </p>}
                    </FormGroup>
                </Col>
            </Row>
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

export default EventForm;
