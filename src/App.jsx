import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// theme overrides
import { Theme } from "theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

// constants
import { userRoles } from "constants/userRoles";

// contexts
import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

// components
import {
    HomeOutlined,
    ExploreOutlined,
    CalendarTodayOutlined,
    DashboardOutlined,
} from "@material-ui/icons";
import MainContainer from "components/MainContainer";

// pages
import Home from "pages/Home";
import Clubs from "pages/Clubs";
import Calendar from "pages/Calendar";
import Dashboard from "pages/Dashboard";

const App = () => {
    const { session } = useContext(SessionContext);
    const { navigation, setNavigation } = useContext(NavigationContext);

    // site navigation
    useEffect(() => {
        const publicRoutes = [
            {
                title: "Home",
                path: "/",
                icon: HomeOutlined,
                component: <Home />,
            },
            {
                title: "Clubs",
                path: "/clubs",
                icon: ExploreOutlined,
                component: <Clubs />,
            },
            {
                title: "Calendar",
                path: "/calendar",
                icon: CalendarTodayOutlined,
                component: <Calendar />,
            },
        ];

        const protectedRoutes =
            session?.user?.group === userRoles.admin
                ? [
                      {
                          title: "Dashboard",
                          path: "/dashboard",
                          icon: DashboardOutlined,
                          component: <Dashboard />,
                      },
                  ]
                : session?.user?.group === userRoles.coordinator
                ? [
                      {
                          title: "Manage Club",
                          path: "/dashboard",
                          icon: DashboardOutlined,
                          component: <Dashboard />,
                      },
                  ]
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
                            {Object.values(navigation.publicRoutes).map((route, idx) => (
                                <Route exact path={route.path} key={idx}>
                                    {route.component}
                                </Route>
                            ))}

                            {/* protected routes */}
                            {Object.values(navigation.protectedRoutes).map((route, idx) => (
                                <Route exact path={route.path} key={idx}>
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
