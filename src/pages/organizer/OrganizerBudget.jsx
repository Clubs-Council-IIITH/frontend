import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Alert } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";

const OrganizerBudget = () => {
    const [proposals, setProposals] = useState(false);
    const [tab, setTab] = useState("proposals");

    useEffect(() => {
        async function getProposals() {
            const res = await API.view("budget/proposals");
            setProposals(res.data);
        }

        getProposals();
    }, []);

    const renderProposals = () => {
        if (!proposals) return <LoadingIndicator />;
        if (proposals.length === 0) return <NullIndicator />;
        return (
            <Page>
                <Row className="mt-4">
                    <Col className="my-3">
                        <Alert color="success">
                            {console.log(proposals)}
                            <h4 className="alert-heading">Current Proposal</h4>
                            <p> {proposals[0].datetime}</p>
                            <p> {proposals[0].link} </p>
                            <p> {proposals[0].pdf} </p>
                        </Alert>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {proposals.slice(1).map((proposal) => (
                        <Col md="4" lg="3" className="my-3" key={proposal.id}>
                            <p> {proposal.datetime}</p>
                            <p> {proposal.link} </p>
                            <p> {proposal.pdf} </p>
                        </Col>
                    ))}
                </Row>
            </Page>
        );
    };

    const renderTabBar = () => {
        const buttonList = [{ text: "proposals", tab: "proposals" }];

        return (
            <div className="tab-nav p-2">
                {buttonList.map((button) => (
                    <Button
                        onClick={() => setTab(button.tab)}
                        className={
                            "text-uppercase mx-1 py-2 nav-btn" +
                            (tab === button.tab ? "-active" : "")
                        }
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        );
    };

    const renderTab = () => {
        switch (tab) {
            case "proposals":
                return renderProposals();
            default:
                return null;
        }
    };

    return (
        <>
            <SecondaryNavbar page="budget" />
            <Page fluid>
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Budget</span>
                        {tab === "proposals" ? (
                            <Button className="new-btn btn-outline-dark py-2 px-3 my-3">
                                <span className="d-md-none"> + </span>
                                <span className="d-none d-md-block"> + NEW PROPOSAL </span>
                            </Button>
                        ) : null}
                    </Page>
                </Container>
                <Page>
                    <Row className="px-4 px-md-0 mx-md-2 mt-4">
                        <Col md className="my-auto px-0">
                            {renderTabBar()}
                        </Col>
                    </Row>
                </Page>
                <Row className="p-0">
                    <Col>{renderTab()}</Col>
                </Row>
            </Page>
        </>
    );
};

export default OrganizerBudget;
