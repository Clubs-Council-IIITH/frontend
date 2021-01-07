import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import "./styles.scss";

const TabBar = ({ tabs }) => {
    const { url } = useRouteMatch();

    return (
        <>
            <RoutedTabs
                startPathWith={url}
                tabClassName="react-tabs__tab"
                activeTabClassName="react-tabs__tab--selected"
            >
                {tabs.map((tab, key) => (
                    <NavTab key={key} to={tab.path}>
                        {tab.title}
                    </NavTab>
                ))}
            </RoutedTabs>
            <Switch>
                <Route
                    exact
                    path={url}
                    render={() => <Redirect replace to={`${url}${tabs[0].path}`} />}
                />
                {tabs.map((tab, key) => (
                    <Route key={key} path={`${url}${tab.path}`}>
                        {tab.component}
                    </Route>
                ))}
            </Switch>
        </>
    );
};

export default TabBar;
