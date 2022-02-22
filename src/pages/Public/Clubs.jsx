import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_CLUBS } from "queries/clubs";
import ClubModel from "models/ClubModel";

import { Grid } from "@mui/material";

import Page from "components/Page";
import { ClubCard } from "components/cards";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const match = useRouteMatch();

    // fetch all clubs
    const { data, loading } = useQuery(GET_ALL_CLUBS, { fetchPolicy: "cache-and-network" });
    const [clubs, setClubs] = useState([]);
    useEffect(() => setClubs(data?.clubs?.map((o) => new ClubModel(o))), [data]);

    useEffect(() => console.log("data:", data), [data]);

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
