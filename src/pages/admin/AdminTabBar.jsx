import React from "react";
import { RoutedTabs, NavTab } from "react-router-tabs";

const AdminTabBar = () => {
    return (
        <ul class="nav mb-2">
            <RoutedTabs startPathWith="/admin">
                <NavTab to="/clubs">Clubs</NavTab>
                <NavTab to="/updates">Updates</NavTab>
                <NavTab to="/users">Users</NavTab>
                <NavTab to="/budgets">Budgets</NavTab>
            </RoutedTabs>
        </ul>
    );
};

export default AdminTabBar;
