import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Alert, Input } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import ProposalItem from "../../components/items/ProposalItem";
import { formatDateTime } from "../../utils/DateTimeFormatter";

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
                    <Col className="mt-3">
                        <Alert color="success" className="proposal-alert p-4">
                            {console.log(proposals)}
                            <div className="proposal-alert-header mb-2 text-uppercase">
                                Current Proposal
                            </div>
                            <div className="proposal-alert-datetime">
                                {formatDateTime(proposals[0].datetime).datetime}
                            </div>
                            <div className="proposal-alert-link mt-3">
                                <Input bsSize="lg" type="text" value={proposals[0].link} readonly />
                            </div>
                            <div className="proposal-alert-pdf mt-3"> {proposals[0].pdf} </div>
                        </Alert>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {proposals.slice(1).map((proposal) => (
                        <Col md="6" lg="4" className="my-3" key={proposal.id}>
                            <ProposalItem {...proposal} />
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
