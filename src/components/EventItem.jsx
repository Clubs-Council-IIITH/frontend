import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

class EventItem extends Component {
   handleDelete = () => {
      var data = {};
      axios
         .post("/api/organizers/events/delete/" + this.props.id, data, {
            headers: {
               Authorization: "Token " + localStorage.getItem("token"),
            },
         })
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
      window.location.reload(false);
   };

   render() {
      return (
         <Jumbotron>
            <ul key={this.props.id}>
               <li> Name: {this.props.name} </li>
               <li> Audience: {this.props.audience} </li>
               <li> DateTime: {this.props.datetime} </li>
               <li> Venue: {this.props.venue} </li>
               <li> Creator: {this.props.creator} </li>
               <li> State: {this.props.state}</li>
            </ul>
            <Button type="button" onClick={this.handleDelete}>
               DELETE
            </Button>
            <Link to={"/events/edit/" + this.props.id}>
               <Button className="mx-3" type="button">
                  EDIT
               </Button>
            </Link>
         </Jumbotron>
      );
   }
}

export default EventItem;
