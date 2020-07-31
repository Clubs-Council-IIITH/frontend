import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";

import EditClubModal from "../../components/EditClubModal";

const ClubItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = (e) => {
        e.preventDefault();
        setEditModal(!editModal);
    };

    const redirectToLink = () => {
        window.location.href = props.link;
    };

    return (
        <Card className="m-2 dash-card elevate">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <CardBody onClick={redirectToLink}>
                <h2> {props.name} </h2>
                <p> {props.mail} </p>
            </CardBody>
            <CardFooter>
                <Button color="warning" onClick={toggleEditModal}>
                    Edit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ClubItem;
