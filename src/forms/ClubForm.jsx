import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Alert,
    Button,
    ListGroup,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";

import API from "../api/methods";

import SubmitButton from "../components/buttons/SubmitButton";
import UserListItem from "../components/items/UserListItem";

const ClubForm = (props) => {
    const [changedUserList, setChangedUserList] = useState([]);
    const [existingUserList, setExistingUserList] = useState([]);
    const [newUserList, setNewUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [failed, setFailed] = useState(false);

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

        if (res.status === 200) {
            changedUserList.forEach(async (user) => {
                var roleFormData = new FormData();
                for (var key in user) roleFormData.append(key, user[key]);
                roleFormData.delete("img");
                var troles = user.roles;
                roleFormData.append("roles", JSON.stringify(troles));

                await API.edit("coordinators", user.id, roleFormData);
            });
            window.location.reload();
        } else setFailed(true);
    };

    const addUser = async (id, role) => {
        const targetUser = newUserList.filter((user) => user.id === id)[0];
        if (!targetUser.roles) targetUser.roles = [];
        targetUser.roles.push([props.id.toString(), role]);
        setExistingUserList([...existingUserList, targetUser]);
        setNewUserList(newUserList.filter((user) => user.id !== id));
        setChangedUserList([...changedUserList, targetUser]);
    };

    const removeUser = async (id) => {
        const targetUser = existingUserList.filter((user) => user.id === id)[0];
        targetUser.roles = targetUser.roles.filter((item) => item[0] !== props.id.toString());
        setNewUserList([...newUserList, targetUser]);
        setExistingUserList(existingUserList.filter((user) => user.id !== id));
        setChangedUserList([...changedUserList, targetUser]);
    };

    const renderExistingUsers = () => {
        if (existingUserList.length === 0) return null;
        return (
            <React.Fragment>
                <h4 className="pt-2"> Existing Users </h4>
                <ListGroup>
                    {existingUserList.map((user) => (
                        <UserListItem
                            existing
                            user={user}
                            removeUser={removeUser}
                            club={props.id}
                        />
                    ))}
                </ListGroup>
            </React.Fragment>
        );
    };

    const renderNewUsers = () => {
        if (newUserList.length === 0) return null;
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

    if (isLoading) return null;
    return (
        <Form id="clubform" onSubmit={handleSubmit(onSubmit)}>
            {failed ? (
                <Alert color="danger"> Something went wrong! Try again in a while.</Alert>
            ) : null}
            <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                    invalid={errors.name}
                    type="text"
                    name="name"
                    innerRef={register({ required: true, pattern: /^[a-zA-Z,.' ]*$/ })}
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
                    <SubmitButton errors={errors}>Save</SubmitButton>
                </Col>
            </Row>
        </Form>
    );
};

export default ClubForm;
