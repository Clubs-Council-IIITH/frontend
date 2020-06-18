import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

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
         .get("/api/organizers/events", {
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
            <div className="container-fluid mt-5">
               <Link to="/events/new">
                  <Button className="my-3">NEW EVENT</Button>
               </Link>
               <div class="row event-row">
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
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default Events;
