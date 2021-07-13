import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { Grid } from "@material-ui/core";

import Page from "components/Page";
import ClubCard from "components/ClubCard";

import ClubService from "services/ClubService";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const { path } = useRouteMatch();

    const [clubs, setClubs] = useState({ loading: true });

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Switch>
            <Route exact path={path}>
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
            <Route path={`${path}/:clubId`}>
                <ViewClub />
            </Route>
        </Switch>
    );
};

export default Clubs;