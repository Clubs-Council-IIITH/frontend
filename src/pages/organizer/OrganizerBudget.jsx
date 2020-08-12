import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Page from "../../components/PageContainer";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";

const OrganizerBudget = () => {
    return (
        <>
            <SecondaryNavbar page="budget" />
            <Page fluid>
                <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                    <Page header>
                        <span className="actionbar-title p-2">Budget</span>
                    </Page>
                </Container>
            </Page>
            <NullIndicator />
        </>
    );
};

export default OrganizerBudget;
