import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardText } from "reactstrap";

const AdminDashboard = () => {
    const cardList = [
        { title: "Manage Clubs", description: "description", link: "./clubs" },
        { title: "Manage Coordinators", description: "description", link: "./coordinators" },
        { title: "Manage Council", description: "description", link: "./council" },
    ];
    return (
        <Container className="pt-5">
            <Row className="pt-5">
                {cardList.map((card) => (
                    <Col lg="4">
                        <Card tag={Link} to={card.link} className="m-3 my-4 dash-card shadow">
                            <CardBody>
                                <h2> {card.title} </h2>
                                <CardText> {card.description} </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
