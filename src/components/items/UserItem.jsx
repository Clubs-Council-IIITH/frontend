import React, { useState } from "react";
import { Button, Card, CardImg, CardBody, CardFooter } from "reactstrap";

import EditUserModal from "../../components/EditUserModal";

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
            <CardFooter>
                <Button color="warning" onClick={toggleEditModal}>
                    Edit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default UserItem;
