import React, { useState } from "react";
import { Jumbotron, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import EventForm from "./EventForm";

const NewEventModal = (props) => {
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
         <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <ModalBody>
               <EventForm action="/api/organizers/events/new" id="" initial={initialData} />
            </ModalBody>
         </Modal>
      </React.Fragment>
   );
};

export default NewEventModal;
