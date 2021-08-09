import { Switch, Route, useRouteMatch } from "react-router-dom";

// import useSWR from "swr";
// import ClubService from "services/ClubService";
import { GetAllClubs } from "services/ClubService";

import { Grid } from "@material-ui/core";

import Page from "components/Page";
import { ClubCard } from "components/cards";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const match = useRouteMatch();

    const { data: clubs, loading } = GetAllClubs();

    return (
        <Switch>
            <Route exact path={match.path}>
                <Page header={"Clubs"} loading={loading} empty={!clubs?.length}>
                    <Grid container spacing={2}>
                        {clubs?.map((club, idx) => (
                            <Grid item md={4} lg={3} key={idx}>
                                <ClubCard {...club} />
                            </Grid>
                        ))}
                    </Grid>
                </Page>
            </Route>
            <Route path={`${match.path}/:clubId`}>
                <ViewClub />
            </Route>
        </Switch>
    );
};

export default Clubs;
