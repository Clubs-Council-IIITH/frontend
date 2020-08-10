import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";

import EditClubModal from "../../components/EditClubModal";
import EditButton from "../../components/buttons/EditButton";

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
        <Card className="dash-card elevate">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <CardBody onClick={redirectToLink}>
                <h2> {props.name} </h2>
                <p> {props.mail} </p>
            </CardBody>
            {props.modifiable ? (
                <CardFooter className="text-right p-2">
                    <EditButton onClick={toggleEditModal} />
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default ClubItem;
