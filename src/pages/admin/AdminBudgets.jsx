import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
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
            <Page>
                <Row className="mt-4">
                    {filteredList.map((club) =>
                        club.proposal ? (
                            <Col md="6" lg="4" className="my-3 d-flex" key={club.id}>
                                <ProposalItem name={club.name} pdf={club.proposal.pdf} />
                            </Col>
                        ) : null
                    )}
                </Row>
            </Page>
        );
    };

    return (
        <>
            <SecondaryNavbar admin page="budgets" />
            <Page fluid>
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Budget Proposals</span>
                    </Page>
                    <Page className="mt-5">
                        <Searchbar
                            className="w-100"
                            dataList={proposals}
                            setFilteredList={setFilteredList}
                        />
                    </Page>
                </Container>
                {renderProposals()}
            </Page>
        </>
    );
};

export default AdminBudgets;
