import React, { Component } from "react";

import Navigationbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import { Jumbotron, Container } from "reactstrap";

class EditEvent extends Component {
   render() {
      return (
         <React.Fragment>
            <Navigationbar />
            <Container>
               <Jumbotron>
                  <EventForm action="/api/events/edit/" id={this.props.match.params.id} />
               </Jumbotron>
            </Container>
         </React.Fragment>
      );
   }
}

export default EditEvent;
