import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Alert, InputGroup, InputGroupAddon, Input } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import ProposalItem from "../../components/items/ProposalItem";
import { formatDateTime } from "../../utils/DateTimeFormatter";

const ClubBudget = (props) => {
    const [proposals, setProposals] = useState(false);

    useEffect(() => {
        async function getProposals() {
            const res = await API.view("budget/proposals", { club: props.match.params.id });
            setProposals(res.data);
        }
        getProposals();
    }, [props.match.params.id]);

    const renderBudget = () => {
        if (!proposals) return <LoadingIndicator />;
        if (proposals.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
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
                        <Col md="6" xl="4" className="my-3" key={proposal.id}>
                            <ProposalItem {...proposal} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return <ClubNavigation match={props.match}> {renderBudget()} </ClubNavigation>;
};

export default ClubBudget;
