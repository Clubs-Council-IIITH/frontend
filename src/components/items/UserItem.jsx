import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";

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
        <Card className="dash-card elevate clickable">
            <ViewUserModal modal={viewModal} toggleModal={toggleViewModal} instance={props} />
            <EditModal modal={editModal} toggleEditModal={toggleEditModal} text="member">
                {/* <UserForm */}
                {/*     action="edit" */}
                {/*     id={props.id} */}
                {/*     initial={props} */}
                {/*     cancelAction={toggleEditModal} */}
                {/* /> */}
            </EditModal>
            <CardImg onClick={toggleViewModal} src={props.img} className="member-img" />
            <CardBody onClick={toggleViewModal}>
                <div className="user-name"> {props.name} </div>
                <div className="user-mail mt-2"> {props.mail} </div>
            </CardBody>
            {props.modifiable ? (
                <CardFooter className="text-right p-2">
                    <EditButton onClick={toggleEditModal} />
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default UserItem;
