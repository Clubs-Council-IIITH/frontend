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

// site navigation
const navigation = [
    {
        title: "Home",
        path: "/",
        icon: HomeOutlined,
        component: <div> home </div>,
    },
    {
        title: "Clubs",
        path: "/clubs",
        icon: ExploreOutlined,
        component: <div> clubs </div>,
    },
    {
        title: "Calendar",
        path: "/calendar",
        icon: CalendarTodayOutlined,
        component: <div> calendar </div>,
    },
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardOutlined,
        component: <div> dashboard </div>,
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
