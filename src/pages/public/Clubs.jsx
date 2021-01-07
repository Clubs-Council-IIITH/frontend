import { Switch, Route, useRouteMatch } from "react-router-dom";

import PageContainer from "components/PageContainer";
import ClubDisplay from "components/ClubDisplay";
import ClubsList from "components/ClubsList";
import Searchbar from "components/Searchbar";

import * as Club from "pages/club";

const Clubs = () => {
    const { path } = useRouteMatch();

    const viewTabs = [
        { title: "About", path: "/about", component: <Club.About /> },
        { title: "Events", path: "/events", component: <Club.Events /> },
        { title: "Members", path: "/members", component: <Club.Members /> },
    ];

    return (
        <Switch>
            <Route exact path={path}>
                <PageContainer title="Clubs" component={<Searchbar searchAttr={(o) => o.name} />}>
                    <ClubsList />
                </PageContainer>
            </Route>
            <Route path={`${path}/:id`}>
                <ClubDisplay tabs={viewTabs} />
            </Route>
        </Switch>
    );
};

export default Clubs;
