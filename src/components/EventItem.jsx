import React, { useCallback } from "react";
import { Card, Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

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
            <ul key={props.id}>
               <li> Name: {props.name} </li>
               <li> Audience: {props.audience} </li>
               <li> DateTime: {props.datetime} </li>
               <li> Venue: {props.venue} </li>
               <li> Creator: {props.creator} </li>
               <li> State: {props.state}</li>
            </ul>
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
