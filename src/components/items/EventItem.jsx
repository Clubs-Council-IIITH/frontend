import React, { useCallback } from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

import API from "../../api/methods";

import EventState from "../EventState";

const EventItem = (props) => {
    const handleDelete = useCallback(async () => {
        const res = await API.delete("events", props.id);
        window.location.reload(false);
    }, [props.id]);

    return (
        <Card className="event-card elevate p-2">
            <div className="card-header">
                <div className="event-datetime">{props.datetime}</div>
                <div className="event-name">{props.name}</div>
                <EventState current={props.state} />
            </div>
            <div className="card-body">
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
                    {props.audience}
                </div>
            </div>
            <div className="card-footer">
                <p onClick={handleDelete}>
                    <img className="card-btn eventdelete-btn m-2" src="/delete-18.svg" alt="D" />
                </p>
                <Link to={"/events/edit/" + props.id}>
                    <p>
                        <img className="card-btn eventedit-btn m-2" src="/edit-18.svg" alt="E" />
                    </p>
                </Link>
            </div>
        </Card>
    );
};

export default EventItem;
