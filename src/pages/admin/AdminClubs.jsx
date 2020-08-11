import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import Searchbar from "../../components/Searchbar";
import NewClubModal from "../../components/NewClubModal";
import ClubItem from "../../components/items/ClubItem";

const AdminClubs = (props) => {
    const [clubList, setClubList] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
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

    return (
        <>
            <SecondaryNavbar page="clubs" />
            <Page>
                <Container fluid className="actionbar-container p-5 rounded-lg">
                    <div className="actionbar-header mx-md-5 mt-0 pt-0">
                        <span className="actionbar-title p-2">Clubs</span>
                        <Button
                            onClick={toggleModal}
                            className="new-btn btn-outline-dark py-2 px-3 my-3"
                        >
                            <span className="d-md-none"> + </span>
                            <span className="d-none d-md-block"> + NEW CLUB </span>
                        </Button>
                    </div>
                    <Row className="mx-md-5 mt-5">
                        <Searchbar dataList={clubList} setFilteredList={setFilteredList} />
                    </Row>
                </Container>

                <NewClubModal modal={modal} toggleModal={toggleModal} />
                {!filteredList ? (
                    <></> // TODO: Add Loading Spinner
                ) : (
                    <Container fluid>
                        <Row className="pt-5 mx-md-5">
                            {filteredList.map((club) => (
                                <Col md="6" lg="4" className="py-3">
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
                    </Container>
                )}
            </Page>
        </>
    );
};

export default AdminClubs;
