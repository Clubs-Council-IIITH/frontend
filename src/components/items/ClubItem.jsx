import React, { useState } from "react";
import { Card, CardBody, CardFooter, Input } from "reactstrap";
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
        <Card className="dash-card club-card elevate">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteClubModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />
            <CardBody tag={Link} to={props.link} className="link-card">
                <div className={"club-name " + (props.modifiable ? null : "text-center mt-3")}>
                    {props.name}
                </div>
            </CardBody>
            <CardFooter className="text-right p-2">
                {props.modifiable ? (
                    <>
                        <div className="club-mail mb-3 mx-1">
                            <Input className="text" value={props.mail} readonly />
                        </div>
                        <EditButton onClick={toggleEditModal} />
                        <DeleteButton onClick={toggleDeleteModal} />
                    </>
                ) : null}
            </CardFooter>
        </Card>
    );
};

export default ClubItem;
