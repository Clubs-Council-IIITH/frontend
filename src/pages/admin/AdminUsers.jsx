import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminNavigation from "./AdminNavigation";
import Searchbar from "../../components/Searchbar";
import NewButton from "../../components/buttons/NewButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewUserModal from "../../components/NewUserModal";
import MemberItem from "../../components/items/MemberItem";
import Transition from "../../components/TransitionContainer";

const AdminMembers = () => {
    const [userList, setMemberList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getMemberList() {
            const res = await API.view("users", {});
            setMemberList(res.data);
            setFilteredList(res.data);
        }

        getMemberList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderMembers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((user) => {
                        return (
                            <Col xs="6" md="4" lg="3" className="my-3 user-card" key={user.id}>
                                <MemberItem modifiable {...user} />
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
            <AdminNavigation>
                <Transition>
                    <Container
                        fluid
                        className="actionbar-container rounded-lg mt-0 mt-sm-5 mt-md-0"
                    >
                        <Row>
                            <Col
                                md="6"
                                className="d-flex flex-row justify-content-between justify-content-md-start"
                            >
                                <span className="actionbar-title ml-md-2 mr-md-5">Members</span>
                                <NewButton onClick={toggleModal} text="new user" />
                            </Col>
                            <Col className="my-4 my-md-auto">
                                <Searchbar
                                    className="w-100"
                                    dataList={userList}
                                    setFilteredList={setFilteredList}
                                    searchAttr={(obj) => obj.name}
                                />
                            </Col>
                        </Row>
                    </Container>
                    {renderMembers()}
                </Transition>
            </AdminNavigation>
        </>
    );
};

export default AdminMembers;
