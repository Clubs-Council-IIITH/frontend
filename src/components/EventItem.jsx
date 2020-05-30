import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";

class EventItem extends Component {
  render() {
    return (
      <Jumbotron>
        <ul key={this.props.id}>
          <li> ID: {this.props.id} </li>
          <li> Name: {this.props.name} </li>
          <li> Audience: {this.props.audience} </li>
          <li> Club: {this.props.club} </li>
          <li> Date: {this.props.date} </li>
          <li> Time: {this.props.time} </li>
          <li> Venue: {this.props.venue} </li>
          <li> Created By: {this.props.created_by} </li>
          <li> STATE: {this.props.state} </li>
        </ul>
      </Jumbotron>
    );
  }
}

export default EventItem;
