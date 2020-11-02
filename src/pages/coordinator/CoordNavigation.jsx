import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UncontrolledCollapse, Button, Container, Row, Col } from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

import NewButton from "../../components/buttons/NewButton";
import Transition from "../../components/TransitionContainer";

const CoordClubNavigation = (props) => {
    const [modal, setModal] = useState(false);

    const location = useLocation();
    const tabs = [
        { to: "/events", title: "Events", modalButton: "New Event" },
        { to: "/members", title: "Members", modalButton: "Add Member" },
        { to: "/budget", title: "Budgets", modalButton: "New Proposal" },
    ];

    const currentPath = () => {
        const path = location.pathname.split("/");
        const tab = tabs.filter((tab) => path.includes(tab.to.slice(1)));
        if (tab.length) return tab[0];
        return "";
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <div className="mb-3 mb-md-5 pt-2 pt-md-3">
                <ul class="nav d-none d-sm-block">
                    <RoutedTabs startPathWith="/club">
                        {tabs.map((tab) => (
                            <NavTab to={tab.to}>{tab.title}</NavTab>
                        ))}
                    </RoutedTabs>
                </ul>
                <Button
                    id="tabs"
                    className="w-100 d-block d-sm-none text-uppercase common-btn nav-tab-collapse nav-tab-current dropdown-toggle mt-1"
                >
                    {currentPath().title}
                </Button>
                <UncontrolledCollapse toggler="#tabs" className="mb-2">
                    <RoutedTabs startPathWith="/club">
                        {tabs.map((tab) => (
                            <NavTab
                                className="nav-tab-collapse common-btn text-uppercase d-sm-none bg-white"
                                activeClassName="d-none"
                                to={tab.to}
                            >
                                {tab.title}
                            </NavTab>
                        ))}
                    </RoutedTabs>
                </UncontrolledCollapse>
            </div>
            <Container fluid className="actionbar-container rounded-lg">
                <Transition>
                    <Row>
                        <Col className="actionbar-title my-auto pt-2">{currentPath().title}</Col>
                        <Col xs="4" className="d-flex justify-content-end">
                            <NewButton
                                className="mx-0"
                                onClick={toggleModal}
                                text={currentPath().modalButton}
                            />
                        </Col>
                    </Row>
                </Transition>
            </Container>
            {props.children}
        </>
    );
};

export default CoordClubNavigation;
