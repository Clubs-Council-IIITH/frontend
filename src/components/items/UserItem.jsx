import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";

import EditUserModal from "../../components/EditUserModal";
import EditButton from "../../components/buttons/EditButton";

const UserItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Card className="dash-card elevate">
            <EditUserModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <CardImg src={props.img} className="user-img" />
            <CardBody>
                <div className="user-name"> {props.name} </div>
                <div className="user-role mt-2"> {props.role} </div>
                <div className="user-mail"> {props.mail} </div>
                <div className="user-mobile"> {props.mobile} </div>
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
