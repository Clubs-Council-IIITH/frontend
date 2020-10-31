import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
} from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

import API from "../../api/methods";

import AdminNavigation from "./AdminNavigation";
import BackButton from "../../components/buttons/BackButton";
import Transition from "../../components/TransitionContainer";

const AdminClubNavigation = (props) => {
    const [club, setClub] = useState(false);

    const location = useLocation();
    const tabs = [
        { to: "/events", title: "Events" },
        { to: "/activity", title: "Activity" },
        { to: "/members", title: "Members" },
        { to: "/budget", title: "Budgets" },
    ];

    const currentPath = () => {
        const path = location.pathname.split("/");
        const tab = tabs.filter((tab) => path.includes(tab.to.slice(1)));
        if (tab.length) return tab[0].title;
        return "";
    };

    useEffect(() => {
        console.log(props.match.params.id);
        async function getClub() {
            const club_res = await API.view("clubs", { id: props.match.params.id });
            setClub(club_res.data[0]);
        }

        getClub();
    }, [props.match.params.id]);

    return (
        <AdminNavigation>
            <Container fluid className="actionbar-container rounded-lg">
                <Row>
                    <Col className="d-flex">
                        <div className="my-auto">
                            <BackButton />
                        </div>
                        <Transition>
                            <div className="actionbar-title my-auto pt-2">{club.name}</div>
                        </Transition>
                    </Col>
                    <Col md="3" className="text-center mt-4 mt-md-0">
                        <UncontrolledButtonDropdown className="mb-2 text-uppercase w-100">
                            <DropdownToggle
                                className="text-uppercase py-3 club-nav-dropdown common-btn"
                                caret
                            >
                                {currentPath()} &nbsp;
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <RoutedTabs startPathWith={`/admin/clubs/${props.match.params.id}`}>
                                    {tabs.map((tab) => (
                                        <NavTab
                                            tag={DropdownItem}
                                            className="club-nav-collapse common-btn text-uppercase bg-white"
                                            activeClassName="d-none"
                                            to={tab.to}
                                        >
                                            {tab.title}
                                        </NavTab>
                                    ))}
                                </RoutedTabs>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </Col>
                </Row>
            </Container>
            {props.children}
        </AdminNavigation>
    );
};

export default AdminClubNavigation;
