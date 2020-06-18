import React, { Component } from "react";
import { Card, Button } from "reactstrap";
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
         <div class="col-lg-3 m-3">
            <Card className="event-card card-block p-3">
               <ul key={this.props.id}>
                  <li> Name: {this.props.name} </li>
                  <li> Audience: {this.props.audience} </li>
                  <li> DateTime: {this.props.datetime} </li>
                  <li> Venue: {this.props.venue} </li>
                  <li> Creator: {this.props.creator} </li>
                  <li> State: {this.props.state}</li>
               </ul>
               <div>
                  <Button className="m-2" type="button" onClick={this.handleDelete}>
                     D
                  </Button>
                  <Link to={"/events/edit/" + this.props.id}>
                     <Button className="m-2" type="button">
                        E
                     </Button>
                  </Link>
               </div>
            </Card>
         </div>
      );
   }
}

export default EventItem;
