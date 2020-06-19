import React, { useState } from "react";
import { Jumbotron, Container } from "reactstrap";

import Navigationbar from "../components/Navbar";
import EventForm from "../components/EventForm";

const NewEvent = () => {
   const [initialData] = useState({
      name: "",
      creator: "",
      datetime: "",
      venue: "",
      audience: "",
      state: "",
   });

   return (
      <React.Fragment>
         <Navigationbar />
         <Container>
            <Jumbotron>
               <EventForm action="/api/organizers/events/new" id="" initial={initialData} />
            </Jumbotron>
         </Container>
      </React.Fragment>
   );
};

export default NewEvent;
