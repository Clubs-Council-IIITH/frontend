import React, { useState } from "react";
import { Card, CardBody, CardFooter, Input } from "reactstrap";
import { Link } from "react-router-dom";

import ClubForm from "../../forms/ClubForm";

import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditModal from "../../components/EditModal";
import DeleteModal from "../DeleteModal";

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
        <Card className="dash-card club-card elevate flex-fill">
            <EditModal modal={editModal} toggleModal={toggleEditModal} text="club">
                <ClubForm
                    action="edit"
                    id={props.id}
                    initial={props}
                    cancelAction={toggleEditModal}
                />
            </EditModal>
            <DeleteModal
                target="clubs"
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />

            <CardBody tag={Link} to={props.link} className="link-card d-flex">
                <div className={"club-name " + (props.modifiable ? null : "text-center m-auto")}>
                    {props.name}
                </div>
            </CardBody>
            {props.modifiable ? (
                <CardFooter className="text-right p-2">
                    <div className="club-mail mb-3 mx-1">
                        <Input className="text" value={props.mail} readOnly disabled />
                    </div>
                    <EditButton onClick={toggleEditModal} />
                    <DeleteButton onClick={toggleDeleteModal} />
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default ClubItem;
