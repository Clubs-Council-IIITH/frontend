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
import MainContainer from "components/MainContainer";

// pages
import Home from "pages/Home";
import Clubs from "pages/Clubs";
import Calendar from "pages/Calendar";
import Dashboard from "pages/Dashboard";

// site navigation
const navigation = [
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
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardOutlined,
        component: <Dashboard />,
    },
];

const App = () => {
    return (
        <MuiThemeProvider theme={Theme}>
            <BrowserRouter>
                <MainContainer navigation={navigation}>
                    <div>
                        <Switch>
                            {navigation.map((route) => (
                                <Route exact path={route.path}>
                                    {route.component}
                                </Route>
                            ))}

                            <Route path="/404">
                                <div> PAGE NOT FOUND </div>
                            </Route>
                            <Redirect to="/404" />
                        </Switch>
                    </div>
                </MainContainer>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;
