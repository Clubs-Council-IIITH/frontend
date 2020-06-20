import React, { useState, useCallback, useEffect } from "react";
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

const Navigationbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [contextAction, setContextAction] = useState("");
   const [contextString, setContextString] = useState("");
   const [authAction, setAuthAction] = useState("");
   const [authString, setAuthString] = useState("");

   const toggle = useCallback(() => {
      setIsOpen(!isOpen);
   });

   const setContext = useCallback(() => {
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
      setContextAction(action);
      setContextString(string);
   });

   useEffect(() => {
      setAuthAction("http://localhost:8000/token");
      setAuthString("LOGIN");
      if (localStorage.getItem("token") !== null) {
         setAuthAction("/logoutRedirect");
         setAuthString("LOGOUT");
         setContext();
      }
   }, []);

   var contextButton = "";
   if (!(contextString === "")) {
      contextButton = (
         <NavItem className="nav-item mx-md-2">
            <NavLink tag={Link} to={contextAction} activeClassName="active">
               {contextString}
            </NavLink>
         </NavItem>
      );
   }

   return (
      <Navbar className="nav-dark py-3" color="dark" dark expand="md">
         <NavbarBrand href="/">
            <img className="nav-logo ml-md-3" src="/cc_logo.svg" alt="cc_logo" />
         </NavbarBrand>
         <NavbarToggler onClick={toggle} />
         <Collapse isOpen={isOpen} navbar>
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
            <a href={authAction}>
               <Button className="nav-btn mr-md-3 mt-3 mt-md-0" outline color="light">
                  {authString}
               </Button>
            </a>
         </Collapse>
      </Navbar>
   );
};

export default Navigationbar;
