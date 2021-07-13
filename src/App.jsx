import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// theme overrides {{{
import { Theme } from "theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
// }}}

// constants {{{
import { userRoles } from "constants/userRoles";
// }}}

// contexts {{{
import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";
// }}}

// components {{{
import {
    HomeOutlined,
    ExploreOutlined,
    CalendarTodayOutlined,
    DashboardOutlined,
    GroupOutlined,
} from "@material-ui/icons";
import MainContainer from "components/MainContainer";
// }}}

// pages {{{
import * as Public from "pages/Public";
import * as Admin from "pages/Admin";
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
    {
        title: "Calendar",
        path: "/calendar",
        icon: CalendarTodayOutlined,
        component: <Public.Calendar />,
    },
];

const adminRoutes = [
    {
        title: "Manage Clubs",
        path: "/admin/clubs",
        icon: DashboardOutlined,
        component: <Admin.Clubs />,
    },
    {
        title: "Manage Users",
        path: "/admin/users",
        icon: GroupOutlined,
        component: <Admin.Users />,
    },
];

const clubRoutes = [
    {
        title: "Manage Club",
        path: "/manage/club",
        icon: DashboardOutlined,
        component: <Club.About />,
    },
];
// }}}

const App = () => {
    const { session } = useContext(SessionContext);
    const { navigation, setNavigation } = useContext(NavigationContext);

    // site navigation
    useEffect(() => {
        const protectedRoutes =
            session?.user?.group === userRoles.admin
                ? adminRoutes
                : session?.user?.group === userRoles.coordinator
                ? clubRoutes
                : [];

        setNavigation({
            publicRoutes,
            protectedRoutes,
        });
    }, [session]);

    return (
        <MuiThemeProvider theme={Theme}>
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
                            {[...adminRoutes, ...clubRoutes].map((route, idx) => (
                                <Route exact={route.exact} path={route.path} key={idx}>
                                    {route.component}
                                </Route>
                            ))}

                            {/* error routes */}
                            <Route exact path="/404">
                                <h1> 404: Not Found </h1>
                            </Route>
                            <Route exact path="/401">
                                <h1> 401: Unauthorized </h1>
                            </Route>
                            <Redirect to="/404" />
                        </Switch>
                    )}
                </MainContainer>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;
