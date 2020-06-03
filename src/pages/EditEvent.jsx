import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";

import axios from "axios";

import Navigationbar from "../components/Navbar";
import EventForm from "../components/EventForm";

class EditEvent extends Component {
   state = {
      isLoading: true,
      initialData: {},
   };

   componentDidMount() {
      this.getInitial();
   }

   getInitial = () => {
      this.setState({ isLoading: true });
      axios
         .get("/api/events/edit/" + this.props.match.params.id, {
            headers: { Authorization: "Token " + localStorage.getItem("token") },
         })
         .then((response) => {
            this.setState({ initialData: response.data, isLoading: false });
            console.log(this.state.initialData);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   render() {
      if (this.state.isLoading) {
         return null; // TODO: Loading Spinner
      }
      return (
         <React.Fragment>
            <Navigationbar />
            <Container>
               <Jumbotron>
                  <EventForm
                     action="/api/events/edit/"
                     id={this.props.match.params.id}
                     initial={this.state.initialData}
                  />
               </Jumbotron>
            </Container>
         </React.Fragment>
      );
   }
}

export default EditEvent;
