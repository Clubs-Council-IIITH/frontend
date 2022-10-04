import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// theme overrides {{{
import { Theme } from "theme";
import { ThemeProvider } from "@mui/material/styles";
// }}}

// constants {{{
import UserGroups from "constants/UserGroups";
// }}}

// contexts {{{
import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";
// }}}

// components {{{
import {
    HomeOutlined,
    ExploreOutlined,
    EventOutlined,
    CalendarTodayOutlined,
    DashboardOutlined,
    GroupOutlined,
    AdminPanelSettingsOutlined,
    InfoOutlined,
    BugReportOutlined,
} from "@mui/icons-material";
import MainContainer from "components/MainContainer";
// }}}

// pages {{{
import * as Public from "pages/Public";
import * as ClubsCouncil from "pages/ClubsCouncil";
import * as SLC from "pages/SLC";
import * as SLO from "pages/SLO";
import * as GAD from "pages/GAD";
import * as Club from "pages/Club";
// }}}

// routes {{{
const publicRoutes = [
    {
        title: "About",
        path: "/about",
        icon: InfoOutlined,
        component: <Public.About />,
    },
    {
        title: "Home",
        path: "/",
        icon: HomeOutlined,
        component: <Public.Home />,
        exact: true,
    },
    {
        title: "Clubs",
        path: "/clubs",
        icon: ExploreOutlined,
        component: <Public.Clubs />,
    },
    {
        title: "Student Bodies",
        path: "/student-bodies",
        icon: GroupOutlined,
        component: <Public.StudentBodies />,
    },
    {
        title: "Calendar",
        path: "/calendar",
        icon: CalendarTodayOutlined,
        component: <Public.Calendar />,
    },
];

const bugFormRoutes = [
    {
        title: "Report Bugs",
        path: "/bug",
        icon: BugReportOutlined,
    },
];

const ccRoutes = [
    {
        title: "Manage Events",
        path: "/admin/cc/events",
        icon: EventOutlined,
        component: <ClubsCouncil.Events />,
    },
    {
        title: "Manage Clubs",
        path: "/admin/cc/clubs",
        icon: DashboardOutlined,
        component: <ClubsCouncil.Clubs />,
    },
    {
        title: "Manage Users",
        path: "/admin/cc/users",
        icon: AdminPanelSettingsOutlined,
        component: <ClubsCouncil.Users />,
    },
];

const slcRoutes = [
    {
        title: "Manage Events",
        path: "/admin/slc/events",
        icon: EventOutlined,
        component: <SLC.Events />,
    },
];

const sloRoutes = [
    {
        title: "Manage Events",
        path: "/admin/slo/events",
        icon: EventOutlined,
        component: <SLO.Events />,
    },
];

const gadRoutes = [
    {
        title: "Manage Events",
        path: "/admin/gad/events",
        icon: EventOutlined,
        component: <GAD.Events />,
    },
];

const clubRoutes = [
    {
        title: "Manage Club",
        path: "/manage/club",
        icon: DashboardOutlined,
        component: <Club.View manage />,
    },
];
// }}}

const App = () => {
    const { session } = useContext(SessionContext);
    const { navigation, setNavigation } = useContext(NavigationContext);

    // site navigation
    useEffect(() => {
        const protectedRoutes =
            session?.group === UserGroups.cc
                ? ccRoutes
                : session?.group === UserGroups.slc
                ? slcRoutes
                : session?.group === UserGroups.slo
                ? sloRoutes
                : session?.group === UserGroups.gad
                ? gadRoutes
                : session?.group === UserGroups.club
                ? clubRoutes
                : [];

        setNavigation({
            publicRoutes,
            protectedRoutes,
            bugFormRoutes,
        });
    }, [session]);

    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <MainContainer>
                    {!!Object.values(navigation).flat().length && (
                        <Switch>
                            {/* public routes */}
                            {publicRoutes.map((route, idx) => (
                                <Route exact={route.exact} path={route.path} key={idx}>
                                    {route.component}
                                </Route>
                            ))}

                            {/* protected routes */}
                            {[
                                ...ccRoutes,
                                ...slcRoutes,
                                ...sloRoutes,
                                ...gadRoutes,
                                ...clubRoutes,
                            ].map((route, idx) => (
                                <Route exact={route.exact} path={route.path} key={idx}>
                                    {route.component}
                                </Route>
                            ))}

                            {bugFormRoutes.map((route, idx) => (
                                <Route
                                    exact={route.exact}
                                    path={route.path}
                                    key={idx}
                                    component={() => {
                                        window.location.href =
                                            "https://forms.office.com/r/zBLuvbBPXZ";
                                        return null;
                                    }}
                                ></Route>
                            ))}

                            {/* error routes */}
                            <Route exact path="/404">
                                <Public.Error404 />
                            </Route>
                            <Route exact path="/401">
                                <Public.Error401 />
                            </Route>
                            <Redirect to="/404" />
                        </Switch>
                    )}
                </MainContainer>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
