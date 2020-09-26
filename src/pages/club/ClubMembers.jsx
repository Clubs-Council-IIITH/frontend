import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import UserItem from "../../components/items/UserItem";
import Transition from "../../components/TransitionContainer";

const ClubMembers = (props) => {
    const [users, setUsers] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getUsers() {
            const users_res = await API.view("coordinators", { club: props.match.params.id });
            setUsers(users_res.data);
            setFilteredList(users_res.data);
        }
        getUsers();
    }, [props.match.params.id]);

    const renderUsers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((user) => (
                        <Col md="4" lg="3" className="my-3 user-card" key={user.id}>
                            <UserItem
                                {...user}
                                role={user.roles.filter((role) => role[0] == club.id)[0][1]} // eslint-disable-line
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
            <Transition>{renderUsers()}</Transition>
        </ClubNavigation>
    );
};

export default ClubMembers;
