import React, { useState } from "react";
import { Button, Card, CardImg, CardBody, CardFooter } from "reactstrap";

import EditUserModal from "../../components/EditUserModal";
import EditButton from "../../components/buttons/EditButton";

const UserItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Card className="m-2 dash-card elevate">
            <EditUserModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <CardImg src={props.img} className="user-img" />
            <CardBody>
                <h2> {props.name} </h2>
                <h4> {props.role} </h4>
                <h4> {props.mail} </h4>
                <h4> {props.mobile} </h4>
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
