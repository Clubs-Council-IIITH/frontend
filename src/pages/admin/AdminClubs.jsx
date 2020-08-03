import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Searchbar from "../../components/Searchbar";
import NewClubModal from "../../components/NewClubModal";
import ClubItem from "../../components/items/ClubItem";

const AdminClubs = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [clubList, setClubList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getClubList() {
            const res = await API.view("clubs", {});
            setClubList(res.data);
        }

        getClubList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (!clubList) return null;
    return (
        <Container fluid>
            <Container fluid className="actionbar-container p-5 rounded-lg">
                <div className="actionbar-header mx-md-5 mt-5 pt-3">
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
                    <Searchbar setSearchTerm={setSearchTerm} />
                </Row>
            </Container>

            <NewClubModal modal={modal} toggleModal={toggleModal} />

            <Container fluid>
                <Row className="pt-5 mx-md-5">
                    {clubList.map((club) => {
                        if (searchTerm !== "" && !club.name.includes(searchTerm)) return null;
                        return (
                            <Col md="4" lg="4">
                                <ClubItem
                                    id={club.id}
                                    name={club.name}
                                    mail={club.mail}
                                    link={props.match.url + "/" + club.id}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </Container>
    );
};

export default AdminClubs;
