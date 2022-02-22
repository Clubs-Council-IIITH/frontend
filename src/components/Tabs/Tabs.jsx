import { useEffect, cloneElement } from "react";

import {
    useLocation,
    useHistory,
    useRouteMatch,
    Redirect,
    Switch,
    Route,
    matchPath,
} from "react-router-dom";

import { useTheme } from "@mui/styles";

import { Tabs, Tab, Box } from "@mui/material";

/*
 * `tabs`: [
 *     { title: "One", panel: PanelOne[, route: "/one"] },
 *     { title: "Two", panel: PanelTwo[, route: "/two"] },
 *     { title: "Three", panel: PanelThree[, route: "/three"] },
 * ];
 *
 * `controller`: [state, setState]
 *
 * `routed`: bool
 */

export const TabBar = ({ tabs, controller: [value, setValue], tabProps, routed }) => {
    const theme = useTheme();
    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();

    // control tabs based on current route
    useEffect(() => {
        if (routed) {
            const tabRoutes = tabs.map((tab) => `${match.url}${tab.route}`);

            var initTab = 0;

            // check if direct tab route or sub route
            const directTab = tabRoutes.indexOf(location.pathname);
            const subTab = tabRoutes.indexOf(
                tabRoutes.filter(
                    (route) => !!matchPath(location.pathname, { path: `${route}/:etc` })
                )[0]
            );

            if (directTab > -1) initTab = directTab;
            else if (subTab > -1) initTab = subTab;

            setValue(initTab);
        }
    }, [value, location.pathname]);

    return (
        <Tabs
            value={value}
            onChange={(_, n) => setValue(n)}
            indicatorColor="primary"
            scrollButtons="auto"
        >
            {tabs.map((tab, key) => (
                <Tab
                    key={key}
                    value={key}
                    label={tab.title}
                    disabled={tab.disabled}
                    sx={{
                        fontFamily: theme.typography.fontFamilySecondary,
                        fontWeight: 600,
                        fontSize: "1.0em",
                        minWidth: "140px",
                    }}
                    wrapped
                    onClick={() =>
                        routed
                            ? history.push(`${match.url !== "/" ? match.url : ""}${tab.route}`)
                            : null
                    }
                />
            ))}
        </Tabs>
    );
};

export const TabPanels = ({ tabs, controller: [value], routed, tabProps, ...props }) => {
    const match = useRouteMatch();

    return routed ? (
        <Switch>
            {tabs.map((tab, key) => (
                <Route path={`${match.path !== "/" ? match.path : ""}${tab.route}`}>
                    <div
                        style={{ zIndex: -2 }}
                        key={key}
                        role="tabpanel"
                        hidden={value !== key}
                        id={`wrapped-tabpanel-${key}`}
                        {...props}
                    >
                        {value === key && <Box>{cloneElement(tab.panel, tabProps)}</Box>}
                    </div>
                </Route>
            ))}
            <Route exact path={match.path}>
                <Redirect to={`${match.url !== "/" ? match.url : ""}${tabs[0].route}`} />
            </Route>
        </Switch>
    ) : (
        tabs.map((tab, key) => (
            <div
                style={{ zIndex: -2 }}
                key={key}
                role="tabpanel"
                hidden={value !== key}
                id={`wrapped-tabpanel-${key}`}
                {...props}
            >
                {value === key && <Box>{cloneElement(tab.panel, tabProps)}</Box>}
            </div>
        ))
    );
};
