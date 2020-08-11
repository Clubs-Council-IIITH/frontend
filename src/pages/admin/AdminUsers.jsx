import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
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
            <Page>
                <Row className="pt-5 mx-md-5 user-card">
                    {filteredList.map((user) => {
                        return (
                            <Col sm="4" lg="3" xl="2" key={user.id} className="py-3 user-card">
                                <UserItem
                                    modifiable
                                    id={user.id}
                                    img={user.img}
                                    name={user.name}
                                    role={user.role}
                                    mail={user.mail}
                                    mobile={user.mobile}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Page>
        );
    };

    return (
        <>
            <SecondaryNavbar page="users" />
            <NewUserModal modal={modal} toggleModal={toggleModal} />
            <Page>
                <Container fluid className="actionbar-container p-5 rounded-lg">
                    <div className="actionbar-header mx-md-5 mt-0 pt-0">
                        <span className="actionbar-title p-2">Users</span>
                        <Button
                            onClick={toggleModal}
                            className="new-btn btn-outline-dark py-2 px-3 my-3"
                        >
                            <span className="d-md-none"> + </span>
                            <span className="d-none d-md-block"> + NEW USER </span>
                        </Button>
                    </div>
                    <Row className="mx-md-5 mt-5">
                        <Searchbar dataList={userList} setFilteredList={setFilteredList} />
                    </Row>
                </Container>
                {renderUsers()}
            </Page>
        </>
    );
};

export default AdminUsers;
