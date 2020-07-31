import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card, CardBody, CardText } from "reactstrap";

import API from "../../api/methods";
import NewClubModal from "../../components/NewClubModal";
import ClubItem from "../../components/items/ClubItem";

const AdminClubs = (props) => {
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
        <Container fluid className="pt-5">
            <NewClubModal modal={modal} toggleModal={toggleModal} />
            <div className="event-header mx-3 mx-md-4 mt-4">
                <span className="logs-title p-2">Clubs</span>
                <Button
                    onClick={toggleModal}
                    className="eventnew-btn body-btn btn-outline-dark py-2 px-3 my-3 mx-md-3"
                >
                    <span className="d-md-none"> + </span>
                    <span className="d-none d-md-block"> + NEW CLUB </span>
                </Button>
            </div>
            <Row className="pt-5 mx-md-2">
                {clubList.map((club) => (
                    <Col md="4" lg="3">
                        <ClubItem
                            id={club.id}
                            name={club.name}
                            mail={club.mail}
                            link={props.match.url + "/" + club.id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminClubs;
