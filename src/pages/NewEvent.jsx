import React, { Component } from "react";

import Navigationbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import { Jumbotron, Container } from "reactstrap";

class NewEvent extends Component {
   render() {
      return (
         <React.Fragment>
            <Navigationbar />
            <Container>
               <Jumbotron>
                  <EventForm />
               </Jumbotron>
            </Container>
         </React.Fragment>
      );
   }
}

export default NewEvent;
