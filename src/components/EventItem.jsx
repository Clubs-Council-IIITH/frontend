import React, { useCallback } from "react";
import { Card, Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import EventState from "./EventState";

const EventItem = (props) => {
   const handleDelete = useCallback(() => {
      axios
         .post(
            "/api/organizers/events/delete/" + props.id + "/",
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

   return (
      <div className="col-md-3 m-3">
         <Card className="event-card card-block p-3">
            <div className="event-datetime">{props.datetime}</div>
            <div className="event-name">{props.name}</div>
            <EventState current={props.state} />
            <div className="event-sep" />
            <div className="event-venue">{props.venue}</div>
            <div className="event-audience">{props.audience}</div>
            <div>
               <Button className="m-2" type="button" onClick={handleDelete}>
                  D
               </Button>
               <Link to={"/events/edit/" + props.id}>
                  <Button className="m-2" type="button">
                     E
                  </Button>
               </Link>
            </div>
         </Card>
      </div>
   );
};

export default EventItem;
