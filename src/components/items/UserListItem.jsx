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
                    <Row>
                        <Col xs="12" className="px-4 py-3 pt-md-0">
                            <Input
                                type="text"
                                name="role"
                                value={role}
                                onChange={(e) => handleChange(e)}
                            />
                        </Col>
                        <Col className="text-right">
                            <Button
                                type="button"
                                onClick={toggleRoleInput}
                                color="secondary"
                                className="mx-2"
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
                                className="mx-2"
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
