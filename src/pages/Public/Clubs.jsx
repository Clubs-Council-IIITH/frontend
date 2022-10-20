import { useTheme } from "@mui/styles";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_CLUBS } from "queries/clubs";

import { Grid, Typography } from "@mui/material";

import ClubCategories from "constants/ClubCategories";

import Page from "components/Page";
import { ClubCard } from "components/cards";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const theme = useTheme();
    const match = useRouteMatch();

    // fetch all clubs (TODO: optimize to fetch 'technical' & 'cultural' clubs)
    const { data: clubsData, loading: clubsLoading } = useQuery(GET_ALL_CLUBS, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <Switch>
            <Route exact path={match.path}>
                <Page noToolbar header={"Clubs"} empty={!clubsLoading && !clubsData?.clubs?.length}>
                    {Object.keys(ClubCategories)
                        .slice(0, 2)
                        .map((category, key) => (
                            <div key={key}>
                                <Typography
                                    variant="h6"
                                    color={theme.palette.grey[500]}
                                    gutterBottom
                                >
                                    {ClubCategories[category].toUpperCase()}
                                </Typography>

                                <Grid container spacing={2} mb={4}>
                                    {clubsLoading
                                        ? [...Array(6).keys()].map((idx) => (
                                              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                                  <ClubCard skeleton />
                                              </Grid>
                                          ))
                                        : clubsData?.clubs
                                              ?.filter((o) => o.category.toLowerCase() === category)
                                              ?.map((club, idx) => (
                                                  <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
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
