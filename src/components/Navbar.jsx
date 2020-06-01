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
   };

   toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
   };

   componentDidMount() {
      if (localStorage.getItem("token") === null) {
         this.setState({
            navbtn_link: "http://localhost:8000/token",
            navbtn_text: "LOGIN",
         });
      } else {
         this.setState({
            navbtn_link: "/logoutRedirect",
            navbtn_text: "LOGOUT",
         });
      }
   }

   render() {
      return (
         <Navbar className="nav-dark py-3" color="dark" dark expand="md">
            <NavbarBrand href="/">
               <img className="nav-logo" src="/cc_logo.svg" alt="cc_logo" />
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
               </Nav>
               <a href={this.state.navbtn_link}>
                  <Button className="nav-btn mt-3 mt-md-0" outline color="light">
                     {this.state.navbtn_text}
                  </Button>
               </a>
            </Collapse>
         </Navbar>
      );
   }
}

export default Navigationbar;
