import React, { Component } from "react";
import { Jumbotron } from "reactstrap";

class EventItem extends Component {
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
         </Jumbotron>
      );
   }
}

export default EventItem;
