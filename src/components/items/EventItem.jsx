import React, { useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

import API from "../../api/methods";

import EventState from "../EventState";
import { formatAudience } from "../../utils/AudienceFormatter";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const EventItem = (props) => {
    const handleDelete = useCallback(async () => {
        const res = await API.delete("events", props.id);
        window.location.reload(false);
    }, [props.id]);

    return (
        <Card className="event-card elevate">
            <CardHeader>
                <div className="event-datetime">{formatDateTime(props.datetime).datetime}</div>
                <div className="event-name">{props.name}</div>
                <EventState current={props.state} />
            </CardHeader>
            <CardBody>
                <div className="event-venue mb-2">
                    <span>
                        <img className="card-icon" src="/venue-18.svg" alt="V" />
                    </span>
                    {props.venue}
                </div>
                <div className="event-audience mb-2">
                    <span>
                        <img className="card-icon" src="/audience-18.svg" alt="A" />
                    </span>
                    {formatAudience(props.audience)}
                </div>
            </CardBody>
            <CardFooter>
                <p onClick={handleDelete}>
                    <img className="card-btn eventdelete-btn m-2" src="/delete-18.svg" alt="D" />
                </p>
                <Link to={"/events/edit/" + props.id}>
                    <p>
                        <img className="card-btn eventedit-btn m-2" src="/edit-18.svg" alt="E" />
                    </p>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default EventItem;
