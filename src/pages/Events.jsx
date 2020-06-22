import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import NewEventModal from "../components/NewEventModal";
import EventItem from "../components/EventItem";

const Events = () => {
   const [eventList, setEventList] = useState([]);
   const [modal, setModal] = useState(false);

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

   const toggleModal = () => {
      setModal(!modal);
   };

   return (
      <React.Fragment>
         <div className="container-fluid mt-5">
            <NewEventModal modal={modal} toggleModal={toggleModal} />
            <Button onClick={toggleModal} className="my-3">
               NEW EVENT
            </Button>
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
