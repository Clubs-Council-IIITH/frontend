import React, { useState } from "react";
import { ListGroupItem, Badge, Row, Col, Button, Input } from "reactstrap";

const UserListItem = (props) => {
    const [roleInput, setRoleInput] = useState(false);
    const [role, setRole] = useState("Coordinator");
    const [invalidRole, setInvalidRole] = useState(false);

    const toggleRoleInput = () => {
        setRoleInput(!roleInput);
    };

    const isValid = (role) => {
        const role_rgx = /^[a-zA-Z0-9 ]*$/;
        return role_rgx.test(role);
    };

    const handleChange = (e) => {
        setInvalidRole(!isValid(e.target.value));
        setRole(e.target.value);
    };

    const renderRole = (roles) => {
        const role = roles.filter((o) => o[0] == props.club); // eslint-disable-line
        console.log(role);
        if (role.length) return role[0][1];
        return null;
    };

    return (
        <ListGroupItem className="p-2">
            <Row>
                <Col xs="2" md="1">
                    <img src={props.user.img} alt={props.user.name} className="userlist-img" />
                </Col>
                {props.existing ? (
                    <React.Fragment>
                        <Col>
                            <Row>
                                <Col className="userlist-name">
                                    {props.user.name}
                                    <Badge className="p-2 mx-3">
                                        {renderRole(props.user.roles)}
                                    </Badge>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="3" className="text-right">
                            <Button
                                type="button"
                                onClick={() => props.removeUser(props.user.id)}
                                color="danger"
                            >
                                Remove
                            </Button>
                        </Col>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
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
                                        invalid={invalidRole}
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
                                            if (!invalidRole) {
                                                toggleRoleInput();
                                                props.addUser(props.user.id, role);
                                            }
                                        }}
                                        color="success"
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </React.Fragment>
                )}
            </Row>
        </ListGroupItem>
    );
};

export default UserListItem;
