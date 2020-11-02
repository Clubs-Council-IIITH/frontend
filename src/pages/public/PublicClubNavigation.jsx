import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UncontrolledCollapse, Button, Container } from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

import API from "../../api/methods";

import BackButton from "../../components/buttons/BackButton";
import Transition from "../../components/TransitionContainer";

const PublicClubNavigation = (props) => {
    const [club, setClub] = useState(false);

    const location = useLocation();
    const tabs = [
        { to: "/events", title: "Events", modalButton: "New Event" },
        { to: "/members", title: "Members", modalButton: "Add Member" },
    ];

    const currentPath = () => {
        const path = location.pathname.split("/");
        const tab = tabs.filter((tab) => path.includes(tab.to.slice(1)));
        if (tab.length) return tab[0];
        return "";
    };

    useEffect(() => {
        async function getClub() {
            const club_res = await API.view("clubs", { id: props.match.params.id });
            setClub(club_res.data[0]);
        }

        getClub();
    }, [props.match.params.id]);

    return (
        <>
            <Container fluid className="actionbar-container rounded-lg">
                <div className="d-flex mb-3 mb-sm-5">
                    <div className="my-auto">
                        <Transition className="my-auto">
                            <BackButton />
                        </Transition>
                    </div>
                    <Transition className="my-auto">
                        <div className="actionbar-title my-auto pt-2">{club.name}</div>
                    </Transition>
                </div>
            </Container>
            <div className="mb-3 mb-md-5 pt-2 pt-md-3 mx-3">
                <Transition>
                    <ul className="nav d-none d-sm-block">
                        <RoutedTabs
                            startPathWith={props.match.url.substring(
                                0,
                                props.match.url.lastIndexOf("/")
                            )}
                        >
                            {tabs.map((tab) => (
                                <NavTab key={tab.to} to={tab.to}>
                                    {tab.title}
                                </NavTab>
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
                        <RoutedTabs
                            startPathWith={props.match.url.substring(
                                0,
                                props.match.url.lastIndexOf("/")
                            )}
                        >
                            {tabs.map((tab) => (
                                <NavTab
                                    className="nav-tab-collapse common-btn text-uppercase d-sm-none bg-white"
                                    activeClassName="d-none"
                                    key={tab.to}
                                    to={tab.to}
                                >
                                    {tab.title}
                                </NavTab>
                            ))}
                        </RoutedTabs>
                    </UncontrolledCollapse>
                </Transition>
            </div>
            {props.children}
        </>
    );
};

export default PublicClubNavigation;
