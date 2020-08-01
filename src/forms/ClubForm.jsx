import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    ListGroup,
    ListGroupItem,
    Badge,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";

import API from "../api/methods";
import UserListItem from "../components/items/UserListItem";

const ClubForm = (props) => {
    const [existingUserList, setExistingUserList] = useState([]);
    const [newUserList, setNewUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.initial.name,
            mail: props.initial.mail,
        },
    });

    useEffect(() => {
        async function getUserList() {
            const res = await API.view("coordinators", {});
            res.data.forEach((user) => {
                var clubs;
                if (user.roles) clubs = user.roles.map((o) => o[0]);
                else clubs = [];
                if (clubs.includes(JSON.stringify(props.id))) existingUserList.push(user);
                else newUserList.push(user);
            });
            setIsLoading(false);
        }

        getUserList();
    }, []); // eslint-disable-line

    const onSubmit = async (data) => {
        var clubForm = document.getElementById("clubform");
        var clubFormData = new FormData(clubForm);

        var res;
        if (props.action === "new") res = await API.new("clubs", clubFormData);
        else res = await API.edit("clubs", props.id, clubFormData);

        console.log(existingUserList);
        existingUserList.forEach(async (user) => {
            var roleFormData = new FormData();
            for (var key in user) roleFormData.append(key, user[key]);
            roleFormData.delete("img");
            var troles = user.roles;
            console.log(troles);
            roleFormData.append("roles", JSON.stringify(troles));

            const user_res = await API.edit("coordinators", user.id, roleFormData);
            console.log(user_res);
        });
        window.location.reload();
    };

    const addUser = async (id, role) => {
        const targetUser = newUserList.filter((user) => user.id === id)[0];
        if (!targetUser.roles) targetUser.roles = [];
        console.log(targetUser);
        targetUser.roles.push([props.id.toString(), role]);
        setExistingUserList([...existingUserList, targetUser]);
        setNewUserList(newUserList.filter((user) => user.id !== id));
    };

    const renderExistingUsers = () => {
        const renderRole = (roles) => {
            const role = roles.filter((o) => o[0] == props.id);
            console.log(role);
            if (role.length) return role[0][1];
            return null;
        };

        if (!existingUserList.length) return null;
        return (
            <React.Fragment>
                <h4 className="pt-2"> Existing Users </h4>
                <ListGroup>
                    {existingUserList.map((user) => (
                        <ListGroupItem className="p-2">
                            <Row>
                                <Col xs="2" md="1">
                                    <img src={user.img} alt={user.name} className="userlist-img" />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col className="userlist-name">
                                            {user.name}
                                            <Badge className="p-2 mx-3">
                                                {renderRole(user.roles)}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </React.Fragment>
        );
    };

    const renderNewUsers = () => {
        if (!newUserList.length) return null;
        return (
            <React.Fragment>
                <h4 className="mt-4"> Add Users </h4>
                <ListGroup className="mt-2">
                    {newUserList.map((user) => (
                        <UserListItem user={user} addUser={addUser} />
                    ))}
                </ListGroup>
            </React.Fragment>
        );
    };

    if (isLoading) return null; // TODO: Add loading spinners
    return (
        <Form id="clubform" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true })}
                />
                <FormFeedback> Club name can not be empty! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="mail"> E-Mail </Label>
                <Input
                    invalid={errors.role}
                    type="email"
                    name="mail"
                    innerRef={register({ register: true })}
                />
                <FormFeedback> Club mail can not be empty! </FormFeedback>
            </FormGroup>

            {props.action === "edit" ? (
                <React.Fragment>
                    <h3 className="pt-4"> Manage Users </h3>
                    {renderExistingUsers()}
                    {renderNewUsers()}
                </React.Fragment>
            ) : null}

            <Row className="mt-4">
                <Col className="text-right px-md-4">
                    <Button className="mx-3" onClick={props.cancelAction}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ClubForm;
