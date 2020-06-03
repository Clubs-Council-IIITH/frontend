import React, { Component } from "react";

import Navigationbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import { Jumbotron, Container } from "reactstrap";

class NewEvent extends Component {
   state = {
      initialData: {
         name: "",
         creator: "",
         datetime: "",
         venue: "",
         audience: "",
         state: "",
      },
   };

   render() {
      return (
         <React.Fragment>
            <Navigationbar />
            <Container>
               <Jumbotron>
                  <EventForm action="/api/events/new/" id="" initial={this.state.initialData} />
               </Jumbotron>
            </Container>
         </React.Fragment>
      );
   }
}

export default NewEvent;
