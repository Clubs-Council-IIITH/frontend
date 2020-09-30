import React from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Input, Badge } from "reactstrap";

const ViewUserModal = (props) => {
    const renderRoles = () => {
        if (props.instance.roles.length === 0) return null;
        props.instance.roles.sort((a, b) => parseInt(b.active_year) - parseInt(a.active_year));
        var prevYear = props.instance.roles[0].active_year;
        props.instance.roles[0]["datebreak"] = true;
        props.instance.roles.forEach(function (role) {
            if (prevYear !== role.active_year) {
                role["datebreak"] = true;
                prevYear = role.active_year;
            }
        });

        return (
            <div className="mt-4">
                {console.log(props.instance.roles)}
                {props.instance.roles.map((role) => (
                    <>
                        {role.datebreak ? (
                            <div className="user-view-role-year font-weight-bold mt-3 mb-1">
                                {role.active_year}
                            </div>
                        ) : null}
                        <div className="user-view-role-item d-flex flex-row mb-2">
                            <div className="user-view-role-club my-auto">{role.club}</div>
                            <div className="d-flex justify-content-center ml-2 my-auto">
                                <Badge className="py-2 px-2">{role.role}</Badge>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        );
    };

    if (props.id === 0) return null;
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <ModalHeader className="blank-modal-header" toggle={props.toggleModal} />
            <ModalBody className="common-modal instance-modal px-4 px-md-5 pb-4 pb-md-5 pt-0">
                <Row className="text-center">
                    <Col>
                        <img
                            src={props.instance.img}
                            alt={props.instance.name}
                            className="user-view-img mb-3"
                        />
                        <div className="user-view-name"> {props.instance.name} </div>
                        <div className="user-view-mail mt-2"> {props.instance.mail} </div>
                        <div className="user-view-mobile mt-2"> {props.instance.mobile} </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <div className="user-view-roles mt-2">{renderRoles()}</div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};

export default ViewUserModal;
