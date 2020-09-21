import React from "react";
import { useLocation } from "react-router-dom";
import { UncontrolledCollapse, Button } from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

const AdminTabBar = () => {
    const location = useLocation();
    const tabs = [
        { to: "/clubs", title: "Clubs" },
        { to: "/users", title: "Users" },
        { to: "/budgets", title: "Budgets" },
    ];

    const currentPath = () => {
        const path = location.pathname.split("/");
        const tab = tabs.filter((tab) => path.includes(tab.to.slice(1)));
        if (tab.length) return tab[0].title;
        return "";
    };

    return (
        <div className="mb-3 mb-md-5">
            <ul class="nav d-none d-sm-block">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab to={tab.to}>{tab.title}</NavTab>
                    ))}
                </RoutedTabs>
            </ul>
            <Button
                id="tabs"
                className="w-100 d-block d-sm-none text-uppercase common-btn nav-tab-collapse nav-tab-current dropdown-toggle mt-2"
            >
                {currentPath()}
            </Button>
            <UncontrolledCollapse toggler="#tabs" className="mb-2">
                <RoutedTabs startPathWith="/admin">
                    {tabs.map((tab) => (
                        <NavTab
                            className="nav-tab-collapse common-btn text-uppercase d-sm-none"
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
