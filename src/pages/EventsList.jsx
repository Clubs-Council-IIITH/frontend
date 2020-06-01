import React, { Component } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import EventItem from "../components/EventItem";
import axios from "axios";

class EventsList extends Component {
   state = {
      eventlist: [],
   };

   componentDidMount() {
      this.getList();
      console.log(localStorage);
   }

   getList = () => {
      axios
         .get("/api/events")
         .then((response) => {
            this.setState({ eventlist: response.data });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   render() {
      return (
         <Container className="mt-5">
            {tgt_action}
            {this.state.eventlist.map((event) => (
               <EventItem
                  key={event.id}
                  id={event.id}
                  audience={event.audience}
                  name={event.name}
                  club={event.club}
                  date={event.date}
                  time={event.time}
                  venue={event.venue}
                  created_by={event.created_by}
                  state={event.state}
               />
            ))}
         </Container>
      );
   }
}

export default EventsList;
