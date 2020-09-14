import React, { useState } from "react";
import Linkify from "react-linkify";
import { Card, CardBody } from "reactstrap";

import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditUpdateModal from "../EditUpdateModal";
import DeleteUpdateModal from "../DeleteUpdateModal";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const UpdateItem = (props) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return (
        <Card className="update-card dash-card flex-fill">
            <EditUpdateModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteUpdateModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.title}
            />
            <CardBody>
                <div className="update-datetime">
                    {props.datetime && formatDateTime(props.datetime).datetime}
                </div>
                <div className="update-title font-weight-bold my-3"> {props.title} </div>
                <div className="update-content mb-3">
                    <Linkify> {props.content} </Linkify>
                </div>
                {props.admin ? (
                    <>
                        <hr className="mt-4" />
                        <div className="update-creator text-right"> {props.creator}</div>
                        <EditButton onClick={toggleEditModal} />
                        <DeleteButton onClick={toggleDeleteModal} />
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default UpdateItem;
