import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import Transition from "../../components/TransitionContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import UpdateItem from "../../components/items/UpdateItem";

const OrganizerUpdates = () => {
    const [updates, setUpdates] = useState(false);

    useEffect(() => {
        async function getUpdates() {
            const res = await API.view("updates");
            setUpdates(res.data);
        }

        getUpdates();
    }, []);

    const renderUpdates = () => {
        if (!updates) return <LoadingIndicator />;
        if (updates.length === 0) return <NullIndicator />;
        return (
            <Page>
                <Row className="mt-4">
                    {updates.map((update) => (
                        <Col md="6" className="my-3" key={update.id}>
                            <UpdateItem {...update} />
                        </Col>
                    ))}
                </Row>
            </Page>
        );
    };

    return (
        <>
            <SecondaryNavbar page="updates" />
            <Transition>
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Updates</span>
                    </Page>
                </Container>
                <Row className="p-0">
                    <Col>{renderUpdates()}</Col>
                </Row>
            </Transition>
        </>
    );
};

export default OrganizerUpdates;
