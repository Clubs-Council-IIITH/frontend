import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_CLUBS } from "queries/clubs";
import ClubModel from "models/ClubModel";

import { Grid, Typography } from "@mui/material";

import ClubCategories from "constants/ClubCategories";

import Page from "components/Page";
import { ClubCard } from "components/cards";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const match = useRouteMatch();

    const [clubs, setClubs] = useState([]);

    // fetch all clubs
    const { loading } = useQuery(GET_ALL_CLUBS, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => setClubs(data?.clubs?.map((o) => new ClubModel(o))),
    });

    return (
        <Switch>
            <Route exact path={match.path}>
                <Page noToolbar header={"Clubs"} loading={loading} empty={!clubs?.length}>
                    {Object.keys(ClubCategories).map((category, key) => (
                        <div key={key}>
                            <Typography variant="h6" color="#888888" gutterBottom>
                                {ClubCategories[category].toUpperCase()}
                            </Typography>

                            <Grid container spacing={2} mb={4}>
                                {clubs
                                    ?.filter((o) => o.category.toLowerCase() === category)
                                    ?.map((club, idx) => (
                                        <Grid item md={4} lg={3} key={idx}>
                                            <ClubCard {...club} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    ))}
                </Page>
            </Route>
            <Route path={`${match.path}/:clubId`}>
                <ViewClub />
            </Route>
        </Switch>
    );
};

export default Clubs;
