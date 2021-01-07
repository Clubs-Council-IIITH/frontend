import { Switch, Route, useRouteMatch } from "react-router-dom";

import PageContainer from "components/PageContainer";
import ClubsList from "components/ClubsList";
import Searchbar from "components/Searchbar";

import About from "pages/club/About";
import Events from "pages/club/Events";
import Members from "pages/club/Members";
import View from "pages/club/View";

const Clubs = () => {
    const { path } = useRouteMatch();

    const viewTabs = [
        { title: "About", path: "/about", component: <About /> },
        { title: "Events", path: "/events", component: <Events /> },
        { title: "Members", path: "/members", component: <Members /> },
    ];

    return (
        <Switch>
            <Route exact path={path}>
                <PageContainer title="Clubs" component={<Searchbar searchAttr={(o) => o.name} />}>
                    <ClubsList />
                </PageContainer>
            </Route>
            <Route path={`${path}/:id`}>
                <View tabs={viewTabs} />
            </Route>
        </Switch>
    );
};

export default Clubs;
