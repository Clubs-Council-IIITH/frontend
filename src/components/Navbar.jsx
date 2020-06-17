import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Button,
} from "reactstrap";

class Navigationbar extends Component {
   state = {
      isOpen: false,
      contextAction: "",
      contextString: "",
   };

   toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
   };

   setContext = () => {
      const usergroup = localStorage.getItem("usergroup");
      var action, string;
      switch (usergroup) {
         case "organizer":
            action = "/events";
            string = "MY EVENTS";
            break;
         case "cc_admin":
            action = "/admin/dashboard";
            string = "DASHBOARD";
            break;
         default:
            action = "";
            string = "";
      }
      this.setState({ contextAction: action, contextString: string });
   };

   componentDidMount() {
      if (localStorage.getItem("token") === null) {
         this.setState({
            authAction: "http://localhost:8000/token",
            authString: "LOGIN",
         });
      } else {
         this.setState({
            authAction: "/logoutRedirect",
            authString: "LOGOUT",
         });
         this.setContext();
      }
   }

   render() {
      var contextButton = "";
      if (!(this.state.contextString === "")) {
         contextButton = (
            <NavItem className="nav-item mx-md-2">
               <NavLink tag={Link} to={this.state.contextAction} activeClassName="active">
                  {this.state.contextString}
               </NavLink>
            </NavItem>
         );
      }
      return (
         <Navbar className="nav-dark py-3" color="dark" dark expand="md">
            <NavbarBrand href="/">
               <img className="nav-logo ml-md-3" src="/cc_logo.svg" alt="cc_logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
               <Nav className="m-auto" navbar>
                  <NavItem className="nav-item mx-md-2 mt-3 mt-md-0">
                     <NavLink tag={Link} to="/" activeClassName="active" exact path="/">
                        HOME
                     </NavLink>
                  </NavItem>
                  <NavItem className="nav-item mx-md-2">
                     <NavLink tag={Link} to="/clubs" activeClassName="active">
                        CLUBS
                     </NavLink>
                  </NavItem>
                  <NavItem className="nav-item mx-md-2">
                     <NavLink tag={Link} to="/calendar" activeClassName="active">
                        CALENDAR
                     </NavLink>
                  </NavItem>
                  <NavItem className="nav-item mx-md-2">
                     <NavLink tag={Link} to="/blog" activeClassName="active">
                        BLOG
                     </NavLink>
                  </NavItem>
                  <NavItem className="nav-item mx-md-2">
                     <NavLink tag={Link} to="/contact" activeClassName="active">
                        CONTACT
                     </NavLink>
                  </NavItem>
                  {contextButton}
               </Nav>
               <a href={this.state.authAction}>
                  <Button className="nav-btn mr-md-3 mt-3 mt-md-0" outline color="light">
                     {this.state.authString}
                  </Button>
               </a>
            </Collapse>
         </Navbar>
      );
   }
}

export default Navigationbar;
