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
                <div className="user-name"> {props.name} </div>
                <div className="user-mail mt-2"> {props.mail} </div>

                {/* move everything below to separate modal */}
                <div className="user-mobile mt-2"> {props.mobile} </div>
                <div className="user-roles mt-2">
                    {props.roles.map((roles) => (
                        <div>{`${roles.active_year}: ${roles.club} : ${roles.role}`}</div>
                    ))}
                </div>
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
