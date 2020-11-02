import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter, Input } from "reactstrap";

import UserForm from "../../forms/UserForm";

import EditModal from "../../components/EditModal";
import EditButton from "../../components/buttons/EditButton";
import ViewUserModal from "../ViewUserModal";

const UserItem = (props) => {
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleViewModal = () => {
        setViewModal(!viewModal);
    };

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Card className="dash-card elevate clickable flex-fill">
            <ViewUserModal modal={viewModal} toggleModal={toggleViewModal} instance={props} />
            <EditModal modal={editModal} toggleModal={toggleEditModal} text="user">
                <UserForm
                    action="edit"
                    id={props.id}
                    initial={props}
                    cancelAction={toggleEditModal}
                />
            </EditModal>
            <CardImg onClick={toggleViewModal} src={props.img} className="member-img" />
            <CardBody onClick={toggleViewModal}>
                <div className="user-name"> {props.name} </div>
                <div className="user-mail mt-3 mx-n1">
                    <Input className="text" value={props.mail} readOnly disabled />
                </div>
            </CardBody>
            <CardFooter className="text-right p-2">
                <EditButton onClick={toggleEditModal} />
            </CardFooter>
        </Card>
    );
};

export default UserItem;
