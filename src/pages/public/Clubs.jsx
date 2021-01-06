import PageContainer from "components/PageContainer";
import ClubsList from "components/ClubsList";
import Searchbar from "components/Searchbar";

import View from "pages/club/View";

import { Switch, Route, useRouteMatch } from "react-router-dom";

const Clubs = () => {
    const { path } = useRouteMatch();

    const viewTabs = [
        { title: "About", component: <h1> about </h1> },
        { title: "Events", component: <h1> events </h1> },
        { title: "Members", component: <h1> members </h1> },
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
