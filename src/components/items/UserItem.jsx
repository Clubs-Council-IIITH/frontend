import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";

import EditModal from "../../components/EditModal";
import EditButton from "../../components/buttons/EditButton";

const UserItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Card className="dash-card">
            {console.log(props)}
            <EditModal modal={editModal} toggleEditModal={toggleEditModal} text="member">
                {/* <UserForm */}
                {/*     action="edit" */}
                {/*     id={props.id} */}
                {/*     initial={props} */}
                {/*     cancelAction={toggleEditModal} */}
                {/* /> */}
            </EditModal>
            <CardImg src={props.img} className="member-img" />
            <CardBody>
                <div className="member-name"> {props.name} </div>
                <div className="member-role mt-2"> {props.role} </div>
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
