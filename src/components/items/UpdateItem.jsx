import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Linkify from "react-linkify";

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
                <div className="update-title font-weight-bold my-2"> {props.title} </div>
                <div className="update-content mb-3">
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
