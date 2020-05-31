import React, { Component } from "react";
import { Container } from "reactstrap";
import EventItem from "../components/EventItem";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

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
         .get(API_URL + "/api/events")
         .then((response) => {
            this.setState({ eventlist: response.data });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   render() {
      let tgt_action;
      if (localStorage.getItem("token") === null) {
         tgt_action = <a href={API_URL + "/token"}> LOGIN </a>;
      } else {
         tgt_action = <p> LOGGED IN. TOKEN: {localStorage.getItem("token")}</p>;
      }
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
