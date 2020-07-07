import React from "react";

import DashboardCard from "../components/DashboardCard";
import { Container, Row, Col } from "reactstrap";

const AdminDashboard = () => {
    const clubList = [
        { name: "Manage Clubs", coordinators: "description", link: "./clubs" },
        { name: "Manage Coordinators", coordinators: "description", link: "./coordinators" },
        { name: "Manage Council", coordinators: "description", link: "./council" },
    ];
    return (
        <Container className="pt-5">
            <Row className="pt-5">
                {clubList.map((club) => (
                    <Col lg="4">
                        <DashboardCard
                            title={club.name}
                            body={club.coordinators}
                            link={club.link}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
