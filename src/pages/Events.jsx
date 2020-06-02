import React, { Component } from "react";
import { Container } from "reactstrap";

import axios from "axios";

import EventItem from "../components/EventItem";
import Navigationbar from "../components/Navbar";

class Events extends Component {
   state = {
      eventlist: [],
   };

   componentDidMount() {
      this.getList();
   }

   getList = () => {
      axios
         .get("/api/events", {
            headers: { Authorization: "Token " + localStorage.getItem("token") },
         })
         .then((response) => {
            this.setState({ eventlist: response.data });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   render() {
      return (
         <React.Fragment>
            <Navigationbar />
            <Container className="mt-5">
               {this.state.eventlist.map((event) => (
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
            </Container>
         </React.Fragment>
      );
   }
}

export default Events;
