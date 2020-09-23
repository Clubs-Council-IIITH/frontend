import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Form,
    FormText,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";

import API from "../api/methods";

import { SessionContext } from "../api/SessionContext";
import SubmitButton from "../components/buttons/SubmitButton";
import FailureAlert from "../components/FailureAlert";
import { parseDateTime } from "../utils/DateTimeFormatter";

const EventForm = (props) => {
    const { session } = useContext(SessionContext);

    const [APIerror, setAPIError] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            creator: "",
            date: parseDateTime(props.initial.datetime).date,
            time: parseDateTime(props.initial.datetime).time,
            duration: props.initial.duration,
            venue: props.initial.venue,
            audience: props.initial.audience,
            state: props.initial.state,
            description: props.initial.description,
        },
    });

    const onSubmit = async (data) => {
        var eventForm = document.getElementById("eventform");
        var eventFormData = new FormData(eventForm);
        eventFormData.set("audience", data.audience.toString());
        eventFormData.set("datetime", new Date(data.date + " " + data.time).toISOString());

        var res;
        if (props.action === "new") res = await API.new("events", eventFormData);
        else res = await API.edit("events", props.id, eventFormData);

        if (res.status === 200) window.location.reload();
        else setAPIError(res.data);
    };

    return (
        <Form id="eventform" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FailureAlert error={APIerror} />
            <Row form>
                <Col lg className="px-lg-3">
                    <FormGroup>
                        <Label for="name"> Name </Label>
                        <Input
                            invalid={errors.name}
                            type="text"
                            name="name"
                            innerRef={register({ required: true, pattern: /^[a-zA-Z0-9,.!? ]*$/ })}
                            autoFocus
                        />
                        <FormFeedback> Event name can not be empty! </FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <Label for="date"> Date </Label>
                                <Input
                                    invalid={errors.date}
                                    type="date"
                                    name="date"
                                    innerRef={register({
                                        required: true,
                                    })}
                                />
                                <FormFeedback> Invalid date! </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label for="time"> Time </Label>
                                <Input
                                    invalid={errors.time}
                                    type="time"
                                    name="time"
                                    innerRef={register({ required: true })}
                                />
                                <FormFeedback> Invalid time! </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="duration"> Duration </Label>
                        <Input
                            invalid={errors.duration}
                            type="text"
                            name="duration"
                            innerRef={register({ required: true })}
                        />
                        <FormFeedback> Invalid duration! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="venue"> Venue (or meeting link) </Label>
                        <Input
                            invalid={errors.venue}
                            type="textarea"
                            name="venue"
                            rows="4"
                            className="event-form-venue"
                            innerRef={register({ required: true })}
                        />
                        <FormFeedback> Invalid venue! </FormFeedback>
                    </FormGroup>
                </Col>
                <Col className="px-lg-3">
                    <FormGroup>
                        <Label for="audience"> Audience </Label>
                        <Input
                            invalid={errors.audience}
                            type="select"
                            name="audience"
                            size="7"
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
                        <FormText color="muted" className="d-none d-lg-block">
                            hold ctrl to select multiple options
                        </FormText>
                        <FormFeedback> Invalid audience! </FormFeedback>
                    </FormGroup>
                    {session.usergroup === "cc_admin" ? (
                        <FormGroup>
                            <Label for="state"> State </Label>
                            <Input
                                invalid={errors.state}
                                type="select"
                                name="state"
                                innerRef={register({ required: true })}
                            >
                                <option value="created"> CREATED </option>
                                <option value="approved"> APPROVED </option>
                                <option value="published"> PUBLISHED </option>
                                <option value="scheduled"> SCHEDULED </option>
                            </Input>
                            <FormFeedback> Invalid state! </FormFeedback>
                        </FormGroup>
                    ) : null}
                    <FormGroup className="d-flex flex-column">
                        <Label for="description"> Description </Label>
                        <Input
                            invalid={errors.description}
                            type="textarea"
                            name="description"
                            rows="5"
                            className="event-form-description"
                            innerRef={register({ required: false })}
                        />
                        <FormFeedback> Invalid description! </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col className="px-lg-3">
                    <FormGroup>
                        <Label for="creator"> Your name? </Label>
                        <Input
                            autocomplete="off"
                            invalid={errors.creator}
                            type="text"
                            name="creator"
                            innerRef={register({ required: true, pattern: /^[a-zA-Z,. ]*$/ })}
                        />
                        <FormFeedback> Your name is required! </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-right px-lg-4">
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

export default EventForm;
