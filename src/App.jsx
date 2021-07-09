import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// theme overrides
import { Theme } from "theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

// components
import {
    HomeOutlined,
    ExploreOutlined,
    CalendarTodayOutlined,
    DashboardOutlined,
} from "@material-ui/icons";
import { NavigationContext } from "components/Navigation/NavigationContext";
import MainContainer from "components/MainContainer";

// pages
import Home from "pages/Home";
import Clubs from "pages/Clubs";
import Calendar from "pages/Calendar";
import Dashboard from "pages/Dashboard";

const App = () => {
    const { navigation, setNavigation } = useContext(NavigationContext);

    // site navigation
    useEffect(() => {
        setNavigation({
            common: [
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
            ],
            actions: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: DashboardOutlined,
                    component: <Dashboard />,
                },
            ],
        });
    }, []);

    return (
        <MuiThemeProvider theme={Theme}>
            <BrowserRouter>
                <MainContainer>
                    {!!Object.values(navigation).flat().length && (
                        <Switch>
                            {Object.values(navigation)
                                .flat()
                                .map((route, idx) => (
                                    <Route exact path={route.path} key={idx}>
                                        {route.component}
                                    </Route>
                                ))}

                            <Route path="/404">
                                <div> PAGE NOT FOUND </div>
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
