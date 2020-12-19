import React from "react";
import { useLocation } from "react-router-dom";
import { UncontrolledCollapse, Button } from "reactstrap";
import { RoutedTabs, NavTab } from "react-router-tabs";

const AdminNavigation = ({ children }) => {
    const location = useLocation();
    const tabs = [
        { to: "/clubs", title: "Clubs" },
        { to: "/users", title: "Users" },
        { to: "/reports", title: "Reports" },
    ];

    const currentPath = () => {
        const path = location.pathname.split("/");
        const tab = tabs.filter((tab) => path.includes(tab.to.slice(1)));
        if (tab.length) return tab[0].title;
        return "";
    };

    return (
        <>
            <div className="mb-3 mb-md-5 pt-2 pt-md-3 mx-3">
                <ul className="nav d-none d-sm-block">
                    <RoutedTabs startPathWith="/admin">
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
                    {currentPath()}
                </Button>
                <UncontrolledCollapse toggler="#tabs" className="mb-2">
                    <RoutedTabs startPathWith="/admin">
                        {tabs.map((tab) => (
                            <NavTab
                                key={tab.to}
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
            {children}
        </>
    );
};

export default AdminNavigation;
