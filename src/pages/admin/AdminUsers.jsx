import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import NewUserModal from "../../components/NewUserModal";
import UserItem from "../../components/items/UserItem";

const AdminUsers = () => {
    const [userList, setUserList] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
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

    if (!userList) return null;
    return (
        <Container fluid>
            <SecondaryNavbar page="users" />
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

            <NewUserModal modal={modal} toggleModal={toggleModal} />

            <Container fluid>
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
            </Container>
        </Container>
    );
};

export default AdminUsers;
