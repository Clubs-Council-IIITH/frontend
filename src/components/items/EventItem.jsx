import React, { useCallback } from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import EventState from "../EventState";

const EventItem = (props) => {
    const handleDelete = useCallback(() => {
        axios
            .post(
                "/api/events/delete/" + props.id + "/",
                {},
                {
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload(false);
    }, [props.id]);

    const formatDT = (rawDT) => {
        var DT = new Date(rawDT);
        var cleanDT =
            DT.getDate() +
            "." +
            DT.getMonth() +
            "." +
            DT.getFullYear() +
            " · " +
            DT.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
        return cleanDT;
    };

    return (
        <div className="col-xl-3 mx-xl-1 my-2 d-flex">
            <Card className="event-card shadow p-2 flex-fill">
                <div className="card-header">
                    <div className="event-datetime">{formatDT(props.datetime)}</div>
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
                        <img
                            className="card-btn eventdelete-btn m-2"
                            src="/delete-18.svg"
                            alt="D"
                        />
                    </p>
                    <Link to={"/events/edit/" + props.id}>
                        <p>
                            <img
                                className="card-btn eventedit-btn m-2"
                                src="/edit-18.svg"
                                alt="E"
                            />
                        </p>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default EventItem;
