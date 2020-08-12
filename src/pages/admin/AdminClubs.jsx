import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewClubModal from "../../components/NewClubModal";
import ClubItem from "../../components/items/ClubItem";

const AdminClubs = (props) => {
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
            <Page>
                <Row className="mt-4">
                    {filteredList.map((club) => (
                        <Col md="6" lg="4" className="my-3" key={club.id}>
                            <ClubItem
                                modifiable
                                id={club.id}
                                name={club.name}
                                mail={club.mail}
                                link={"/admin/clubs/" + club.id}
                            />
                        </Col>
                    ))}
                </Row>
            </Page>
        );
    };

    return (
        <>
            <SecondaryNavbar admin page="clubs" />
            <NewClubModal modal={modal} toggleModal={toggleModal} />
            <Page fluid>
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Clubs</span>
                        <Button
                            onClick={toggleModal}
                            className="new-btn btn-outline-dark py-2 px-3 my-3"
                        >
                            <span className="d-md-none"> + </span>
                            <span className="d-none d-md-block"> + NEW CLUB </span>
                        </Button>
                    </Page>
                    <Page className="mt-5">
                        <Searchbar
                            className="w-100"
                            dataList={clubList}
                            setFilteredList={setFilteredList}
                        />
                    </Page>
                </Container>
                {renderClubs()}
            </Page>
        </>
    );
};

export default AdminClubs;
