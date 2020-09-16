import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminTabBar from "./AdminTabBar";
import Page from "../../components/PageContainer";
import Transition from "../../components/TransitionContainer";
import Searchbar from "../../components/Searchbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewUserModal from "../../components/NewUserModal";
import UserItem from "../../components/items/UserItem";

const AdminUsers = () => {
    const [userList, setUserList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getUserList() {
            const res = await API.view("coordinators", {});
            setUserList(res.data);
            setFilteredList(res.data);
        }

        getUserList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderUsers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid>
                <Row className="mt-4">
                    {filteredList.map((user) => {
                        return (
                            <Col xs="6" md="4" lg="3" className="my-3 user-card" key={user.id}>
                                <UserItem modifiable {...user} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    };

    return (
        <>
            <NewUserModal modal={modal} toggleModal={toggleModal} />
            <Page fluid>
                <AdminTabBar />
                <Transition>
                    <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                        <Container fluid>
                            <span className="actionbar-title p-2">Users</span>
                            <Button
                                onClick={toggleModal}
                                className="new-btn btn-outline-dark py-2 px-3 my-3"
                            >
                                <span className="d-md-none"> + </span>
                                <span className="d-none d-md-block"> + NEW USER </span>
                            </Button>
                        </Container>
                        <Container fluid className="mt-5">
                            <Searchbar
                                className="w-100"
                                dataList={userList}
                                setFilteredList={setFilteredList}
                            />
                        </Container>
                    </Container>
                    {renderUsers()}
                </Transition>
            </Page>
        </>
    );
};

export default AdminUsers;
