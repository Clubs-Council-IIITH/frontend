import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminNavigation from "./AdminNavigation";
import Searchbar from "../../components/Searchbar";
import NewButton from "../../components/buttons/NewButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewClubModal from "../../components/NewClubModal";
import ClubItem from "../../components/items/ClubItem";
import Transition from "../../components/TransitionContainer";

const AdminClubs = () => {
    const [clubList, setClubList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getClubList() {
            const res = await API.view("clubs", {});
            setClubList(res.data);
            setFilteredList(res.data);
        }

        getClubList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderClubs = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((club) => {
                        if (club.state === "deleted") return null;
                        return (
                            <Col md="6" lg="4" className="my-3 d-flex" key={club.id}>
                                <ClubItem modifiable {...club} link={"/admin/clubs/" + club.id} />
                            </Col>
                        );
                    })}
                </Row>
                <Row className="mt-4">
                    {filteredList.map((club) => {
                        if (club.state !== "deleted") return null;
                        return (
                            <Col md="6" lg="4" className="my-3 d-flex" key={club.id}>
                                <ClubItem {...club} link={"/admin/clubs/" + club.id} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    };

    return (
        <>
            <NewClubModal modal={modal} toggleModal={toggleModal} />
            <AdminNavigation>
                <Transition>
                    <Container fluid className="actionbar-container rounded-lg">
                        <Row>
                            <Col
                                md="6"
                                className="d-flex flex-row justify-content-between justify-content-md-start"
                            >
                                <span className="actionbar-title ml-md-2">Clubs</span>
                                <NewButton onClick={toggleModal} text="club" />
                            </Col>
                            <Col className="my-4 my-md-auto">
                                <Searchbar
                                    className="w-100"
                                    dataList={clubList}
                                    setFilteredList={setFilteredList}
                                />
                            </Col>
                        </Row>
                    </Container>
                    {renderClubs()}
                </Transition>
            </AdminNavigation>
        </>
    );
};

export default AdminClubs;
