import React, { useState } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";

import EditModal from "../../components/EditModal";
import EditButton from "../../components/buttons/EditButton";

const MemberItem = (props) => {
    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Card className="dash-card">
            <EditModal modal={editModal} toggleModal={toggleEditModal} text="member">
                {/* <MemberForm */}
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

export default MemberItem;
