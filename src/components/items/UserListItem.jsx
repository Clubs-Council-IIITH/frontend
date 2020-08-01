import React, { useState } from "react";
import { ListGroupItem, Row, Col, Button, Input } from "reactstrap";

const UserListItem = (props) => {
    const [roleInput, setRoleInput] = useState(false);
    const [role, setRole] = useState("Coordinator");

    const toggleRoleInput = () => {
        setRoleInput(!roleInput);
    };

    const handleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <ListGroupItem className="p-2">
            <Row>
                <Col xs="2" md="1">
                    <img src={props.user.img} alt={props.user.name} className="userlist-img" />
                </Col>
                <Col>
                    <Row>
                        <Col className="userlist-name">{props.user.name}</Col>
                    </Row>
                    <Row>
                        <Col className="userlist-mail">{props.user.mail}</Col>
                    </Row>
                </Col>
                {!roleInput ? (
                    <Col xs="3" className="text-right">
                        <Button type="button" onClick={toggleRoleInput} color="success">
                            Add
                        </Button>
                    </Col>
                ) : (
                    <Row className="px-3 pt-2 pt-md-0">
                        <Col xs="12">
                            <Input
                                type="text"
                                name="role"
                                value={role}
                                onChange={(e) => handleChange(e)}
                            />
                        </Col>
                        <Col xs="12" className="text-right pt-2">
                            <Button
                                type="button"
                                onClick={toggleRoleInput}
                                color="secondary"
                                className="mx-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    toggleRoleInput();
                                    props.addUser(props.user.id, role);
                                }}
                                color="success"
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                )}
            </Row>
        </ListGroupItem>
    );
};

export default UserListItem;
