import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Alert, Input, InputGroup, InputGroupAddon } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import Transition from "../../components/TransitionContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewProposalModal from "../../components/NewProposalModal";
import ProposalItem from "../../components/items/ProposalItem";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const OrganizerBudget = () => {
    const [proposals, setProposals] = useState(false);
    const [modal, setModal] = useState(false);
    const [tab, setTab] = useState("proposals");

    useEffect(() => {
        async function getProposals() {
            const res = await API.view("budget/proposals");
            setProposals(res.data);
        }

        getProposals();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderProposals = () => {
        if (!proposals) return <LoadingIndicator />;
        if (proposals.length === 0) return <NullIndicator />;
        return (
            <Page>
                <Row className="mt-4">
                    <Col className="mt-3">
                        <Alert color="success" className="proposal-alert p-4">
                            <div className="proposal-alert-header mb-2 text-uppercase">
                                Current Proposal
                            </div>
                            <div className="proposal-alert-datetime">
                                {formatDateTime(proposals[0].datetime).datetime}
                            </div>
                            <Row>
                                <Col lg="9" className="proposal-alert-link mt-3">
                                    <InputGroup>
                                        <Input
                                            bsSize="lg"
                                            type="text"
                                            value={proposals[0].link}
                                            readonly
                                        />
                                        <InputGroupAddon
                                            addonType="append"
                                            className="proposal-link-btn"
                                        >
                                            <Button
                                                color="success"
                                                className="common-btn"
                                                onClick={() =>
                                                    window.open(proposals[0].link, "_blank")
                                                }
                                            >
                                                <img
                                                    src="/open-18.svg"
                                                    className="btn-icon mb-1 mr-1"
                                                    alt="O"
                                                />
                                                <span> OPEN </span>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col className="proposal-alert-pdf mt-3">
                                    <Button
                                        color="danger"
                                        size="lg"
                                        tag={Link}
                                        target="_blank"
                                        to={proposals[0].pdf}
                                        className="common-btn w-100"
                                    >
                                        <img
                                            src="/view-18.svg"
                                            className="btn-icon mb-1 mr-1"
                                            alt="V"
                                        />
                                        <span> VIEW PDF </span>
                                    </Button>
                                </Col>
                            </Row>
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

    // eslint-disable-next-line
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
            <Transition>
                <NewProposalModal modal={modal} toggleModal={toggleModal} />
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Budget</span>
                        {/* {tab === "proposals" ? ( */}
                        {/*     <Button */}
                        {/*         onClick={toggleModal} */}
                        {/*         className="new-btn btn-outline-dark py-2 px-3 my-3" */}
                        {/*     > */}
                        {/*         <span className="d-md-none"> + </span> */}
                        {/*         <span className="d-none d-md-block"> + NEW PROPOSAL </span> */}
                        {/*     </Button> */}
                        {/* ) : null} */}
                    </Page>
                </Container>
                {/* <Page> */}
                {/*     <Row className="px-4 px-md-0 mx-md-2 mt-4"> */}
                {/*         <Col md className="my-auto px-0"> */}
                {/*             {renderTabBar()} */}
                {/*         </Col> */}
                {/*     </Row> */}
                {/* </Page> */}
                <Row className="p-0">
                    <Col>{renderTab()}</Col>
                </Row>
            </Transition>
        </>
    );
};

export default OrganizerBudget;
