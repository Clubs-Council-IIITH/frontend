import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditClubModal from "../../components/EditClubModal";
import DeleteClubModal from "../DeleteClubModal";

const ClubItem = (props) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return (
        <Card className="dash-card elevate">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteClubModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />
            <CardBody tag={Link} to={props.link} className="link-card">
                <h2> {props.name} </h2>
                <p> {props.mail} </p>
            </CardBody>
            <CardFooter className="text-right p-2">
                {props.modifiable ? (
                    <>
                        <EditButton onClick={toggleEditModal} />
                        <DeleteButton onClick={toggleDeleteModal} />
                    </>
                ) : null}
            </CardFooter>
        </Card>
    );
};

export default ClubItem;
