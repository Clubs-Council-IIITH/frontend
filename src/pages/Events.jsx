import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import EventItem from "../components/EventItem";

const Events = () => {
   const [eventList, setEventList] = useState([]);

   useEffect(() => {
      axios
         .get("/api/organizers/events", {
            headers: { Authorization: "Token " + localStorage.getItem("token") },
         })
         .then((response) => {
            setEventList(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <React.Fragment>
         <div className="container-fluid mt-5">
            <Link to="/events/new">
               <Button className="my-3">NEW EVENT</Button>
            </Link>
            <div className="row event-row">
               {eventList.map((event) => (
                  <EventItem
                     key={event.id}
                     id={event.id}
                     audience={event.audience}
                     name={event.name}
                     datetime={event.datetime}
                     venue={event.venue}
                     creator={event.creator}
                     state={event.state}
                  />
               ))}
            </div>
         </div>
      </React.Fragment>
   );
};

export default Events;
