import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminTabBar from "./AdminTabBar";
import Transition from "../../components/TransitionContainer";
import Searchbar from "../../components/Searchbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import ProposalItem from "../../components/items/ProposalItem";

const AdminBudgets = () => {
    const [proposals, setProposals] = useState([]);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getProposals() {
            const clubs_res = await API.view("clubs", {});
            const proposals_res = await API.view("budget/proposals");
            const proposal_list = clubs_res.data.map((club) => ({
                ...club,
                proposal: proposals_res.data.filter((proposal) => proposal.club === club.id)[0],
            }));

            setProposals(proposal_list);
            setFilteredList(proposal_list);
        }

        getProposals();
    }, []);

    const renderProposals = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((club) =>
                        club.proposal && club.state === "active" ? (
                            <Col md="6" lg="4" className="my-3 d-flex" key={club.id}>
                                <ProposalItem name={club.name} pdf={club.proposal.pdf} />
                            </Col>
                        ) : null
                    )}
                </Row>
            </Container>
        );
    };

    return (
        <>
            <AdminTabBar />
            <Transition>
                <Container fluid className="actionbar-container rounded-lg">
                    <Row>
                        <Col md="6" className="d-flex flex-row">
                            <span className="actionbar-title ml-md-2">Budget Proposals</span>
                        </Col>
                        <Col className="my-4 my-md-auto">
                            <Searchbar
                                className="w-100"
                                dataList={proposals}
                                setFilteredList={setFilteredList}
                            />
                        </Col>
                    </Row>
                </Container>
                {renderProposals()}
            </Transition>
        </>
    );
};

export default AdminBudgets;
