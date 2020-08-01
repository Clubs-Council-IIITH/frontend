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
        <ListGroupItem>
            <Row>
                <Col>
                    {props.user.name}, {props.user.mail}
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
