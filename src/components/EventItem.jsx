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
         <Card className="event-card p-2 flex-fill">
            <div className="card-body">
               <div className="event-datetime">{formatDT(props.datetime)}</div>
               <div className="event-name">{props.name}</div>
               <EventState current={props.state} />
               <div className="event-sep" />
               <div className="event-venue">{props.venue}</div>
               <div className="event-audience">{props.audience}</div>
            </div>
            <div className="card-footer">
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
