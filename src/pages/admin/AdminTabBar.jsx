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
        <div className="mb-3 mb-md-2">
            <ul class="nav d-none d-sm-block">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab to={tab.to}>{tab.title}</NavTab>
                    ))}
                </RoutedTabs>
            </ul>
            <Button
                id="tabs"
                className="w-100 d-block d-sm-none text-uppercase common-btn nav-tab-collapse nav-tab-current dropdown-toggle"
            >
                {tabs.filter((tab) => tab.to === `/${location.pathname.split("/").pop()}`)[0].title}
            </Button>
            <UncontrolledCollapse toggler="#tabs" className="mb-2">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab
                            className="nav-tab-collapse common-btn text-uppercase"
                            activeClassName="d-none"
                            to={tab.to}
                        >
                            {tab.title}
                        </NavTab>
                    ))}
                </RoutedTabs>
            </UncontrolledCollapse>
        </div>
    );
};

export default AdminTabBar;
