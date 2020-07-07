import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const AdminClubs = (props) => {
    const [clubList, setClubList] = useState(false);
    useEffect(() => {
        axios
            .get("/api/clubs/", {
                headers: { Authorization: "Token " + localStorage.getItem("token") },
            })
            .then((response) => {
                console.log(response);
                setClubList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!clubList) return null;
    return (
        <Container fluid className="pt-5">
            <Row className="pt-5 mx-md-2">
                {clubList.map((club) => (
                    <Col md="4" lg="3">
                        <Card
                            tag={Link}
                            to={props.match.url + "/" + club.id}
                            className="m-2 dash-card elevate"
                        >
                            <CardBody>
                                <h2> {club.name} </h2>
                                <CardText> {club.mail} </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminClubs;
