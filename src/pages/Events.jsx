import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

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
         <div className="container-fluid mt-4">
            <NewEventModal modal={modal} toggleModal={toggleModal} />
            <div className="event-header mx-3">
               <span class="event-title"> Upcoming Events </span>
               <Button
                  onClick={toggleModal}
                  className="eventnew-btn body-btn btn-outline-dark py-2 px-3 my-3"
               >
                  <span className="d-md-none"> + </span>
                  <span className="d-none d-md-block"> + NEW EVENT </span>
               </Button>
            </div>
            <div className="row event-row my-5">
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
