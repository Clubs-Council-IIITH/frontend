import React from "react";
import { useLocation } from "react-router-dom";
import { UncontrolledCollapse, Button } from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

const AdminTabBar = () => {
    const location = useLocation();
    const tabs = [
        { to: "/clubs", title: "Clubs" },
        { to: "/updates", title: "Updates" },
        { to: "/users", title: "Users" },
        { to: "/budgets", title: "Budgets" },
    ];

    return (
        <>
            <ul class="nav mb-2 d-none d-sm-block">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab to={tab.to}>{tab.title}</NavTab>
                    ))}
                </RoutedTabs>
            </ul>
            <Button id="tabs" className="w-100 d-block d-sm-none">
                {tabs.filter((tab) => tab.to === `/${location.pathname.split("/").pop()}`)[0].title}
            </Button>
            <UncontrolledCollapse toggler="#tabs">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab className="nav-tab-collapse" activeClassName="d-none" to={tab.to}>
                            {tab.title}
                        </NavTab>
                    ))}
                </RoutedTabs>
            </UncontrolledCollapse>
        </>
    );
};

export default AdminTabBar;
