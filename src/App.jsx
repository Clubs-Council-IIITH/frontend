import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// mui x datetime
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
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
} from "@mui/icons-material";
import MainContainer from "components/MainContainer";
// }}}

// pages {{{
import * as Public from "pages/Public";
import * as ClubsCouncil from "pages/ClubsCouncil";
import * as Club from "pages/Club";
// }}}

// routes {{{
const publicRoutes = [
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
    // {
    //     title: "Calendar",
    //     path: "/calendar",
    //     icon: CalendarTodayOutlined,
    //     component: <Public.Calendar />,
    // },
];

const ccRoutes = [
    {
        title: "Manage Events",
        path: "/admin/events",
        icon: EventOutlined,
        component: <ClubsCouncil.Events />,
    },
    {
        title: "Manage Clubs",
        path: "/admin/clubs",
        icon: DashboardOutlined,
        component: <ClubsCouncil.Clubs />,
    },
    {
        title: "Manage Users",
        path: "/admin/users",
        icon: GroupOutlined,
        component: <ClubsCouncil.Users />,
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
                : session?.group === UserGroups.club
                    ? clubRoutes
                    : [];

        setNavigation({
            publicRoutes,
            protectedRoutes,
        });
    }, [session]);

    return (
        <ThemeProvider theme={Theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
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
                                {[...ccRoutes, ...clubRoutes].map((route, idx) => (
                                    <Route exact={route.exact} path={route.path} key={idx}>
                                        {route.component}
                                    </Route>
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
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
