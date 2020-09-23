import React, { useState } from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import Linkify from "react-linkify";

import UpdateForm from "../../forms/UpdateForm";

import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
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
        <Card className="update-card">
            <EditModal modal={editModal} toggleEditModal={toggleEditModal} text="update">
                <UpdateForm
                    action="edit"
                    id={props.id}
                    initial={props}
                    cancelAction={toggleEditModal}
                />
            </EditModal>
            <DeleteModal
                target="updates"
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.title}
            />

            <CardHeader className="my-0 py-0 pt-2 pt-md-0">
                {props.tag.toLowerCase() !== "normal" ? (
                    <Badge
                        color={
                            { reminder: "warning", important: "danger" }[props.tag.toLowerCase()]
                        }
                        className="update-tag text-uppercase"
                    >
                        {props.tag}
                    </Badge>
                ) : null}
            </CardHeader>
            <CardBody className={props.tag.toLowerCase() !== "normal" ? "pt-2 pt-md-1" : ""}>
                <div className="update-datetime">
                    {props.datetime && formatDateTime(props.datetime).datetime}
                </div>
                <div className="update-title font-weight-bold my-2"> {props.title} </div>
                <div className="update-content mb-2">
                    <Linkify> {props.content} </Linkify>
                </div>
                {props.admin ? (
                    <>
                        <hr className="mt-4" />
                        <Row>
                            <Col xs="6" sm="4">
                                <EditButton onClick={toggleEditModal} />
                                <DeleteButton onClick={toggleDeleteModal} />
                            </Col>
                            <Col className="d-flex flex-row-reverse">
                                <div className="update-creator my-auto">{props.creator}</div>
                            </Col>
                        </Row>
                    </>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default UpdateItem;
