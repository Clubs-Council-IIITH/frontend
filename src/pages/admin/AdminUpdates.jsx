import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminNavigation from "./AdminNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewUpdateModal from "../../components/NewUpdateModal";
import UpdateItem from "../../components/items/UpdateItem";

const AdminUpdates = () => {
    const [updates, setUpdates] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getUpdates() {
            const res = await API.view("updates");
            setUpdates(res.data);
        }

        getUpdates();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderUpdates = () => {
        if (!updates) return <LoadingIndicator />;
        if (updates.length === 0) return <NullIndicator />;
        return (
            <Container fluid>
                <Row className="mt-4">
                    {updates.map((update) => (
                        <Col lg="6" className="my-3" key={update.id}>
                            <UpdateItem admin {...update} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <>
            <AdminNavigation>
                <NewUpdateModal modal={modal} toggleModal={toggleModal} />
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Container fluid>
                        <span className="actionbar-title p-2">Updates</span>
                        <Button
                            onClick={toggleModal}
                            className="new-btn btn-outline-dark py-2 px-3 my-3"
                        >
                            <span className="d-md-none"> + </span>
                            <span className="d-none d-md-block"> + NEW UPDATE </span>
                        </Button>
                    </Container>
                </Container>
                <Row className="p-0">
                    <Col>{renderUpdates()}</Col>
                </Row>
            </AdminNavigation>
        </>
    );
};

export default AdminUpdates;
