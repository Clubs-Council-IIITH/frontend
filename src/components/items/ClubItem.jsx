import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

import EditClubModal from "../../components/EditClubModal";
import EditButton from "../../components/buttons/EditButton";

const ClubItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = (e) => {
        e.preventDefault();
        setEditModal(!editModal);
    };

    return (
        <Card className="dash-card elevate">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <CardBody tag={Link} to={props.link} className="link-card">
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
