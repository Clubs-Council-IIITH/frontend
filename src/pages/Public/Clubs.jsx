import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ClubService from "services/ClubService";

import { Grid } from "@material-ui/core";

import Page from "components/Page";
import { ClubCard } from "components/cards";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const match = useRouteMatch();

    const [clubs, setClubs] = useState({ loading: true });

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Switch>
            <Route exact path={match.path}>
                <Page header={"Clubs"} loading={clubs?.loading} empty={!clubs?.data?.length}>
                    <Grid container spacing={2}>
                        {clubs?.data?.map((club, idx) => (
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
