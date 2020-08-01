import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import UserItem from "../../components/items/UserItem";
import NewUserModal from "../../components/NewUserModal";

const AdminUsers = () => {
    const [userList, setUserList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getUserList() {
            const res = await API.view("coordinators", {});
            setUserList(res.data);
        }

        getUserList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (!userList) return null;
    return (
        <Container fluid className="pt-5">
            <NewUserModal modal={modal} toggleModal={toggleModal} />
            <div className="event-header mx-3 mx-md-4 mt-4">
                <span className="logs-title p-2">Users</span>
                <Button
                    onClick={toggleModal}
                    className="eventnew-btn body-btn btn-outline-dark py-2 px-3 my-3 mx-md-3"
                >
                    <span className="d-md-none"> + </span>
                    <span className="d-none d-md-block"> + NEW USER </span>
                </Button>
            </div>
            <Row className="pt-5 mx-md-2">
                {userList.map((user) => (
                    <Col md="4" lg="3">
                        <UserItem
                            id={user.id}
                            img={user.img}
                            name={user.name}
                            role={user.role}
                            mail={user.mail}
                            mobile={user.mobile}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminUsers;
