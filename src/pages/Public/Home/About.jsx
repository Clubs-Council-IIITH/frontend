import { useContext } from "react";
import { useTheme } from "@mui/styles";

import { useQuery } from "@apollo/client";
import { GET_ALL_CLUBS } from "queries/clubs";

import { Card, Grid, Box, Typography } from "@mui/material";
import { NavigationContext } from "contexts/NavigationContext";

const Statistic = ({ number, title }) => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: theme.borderRadius,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.light,
                borderColor: theme.palette.secondary.dark,
            }}
        >
            <Box p={isTabletOrMobile ? 1.5 : 2.0}>
                <Typography variant="h4">{number}</Typography>
                <Typography variant={isTabletOrMobile ? "subtitle2" : "subtitle1"}>
                    {title}
                </Typography>
            </Box>
        </Card>
    );
};

const About = () => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);

    // fetch all clubs
    const { data: clubsData, loading: clubsLoading } = useQuery(GET_ALL_CLUBS, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000,
    });

    if (clubsLoading) return null;

    return (
        <Box px={3} py={6} backgroundColor={theme.palette.primary.main}>
            <Box>
                <Typography variant="h4" color="secondary" fontWeight={500} gutterBottom>
                    Clubs @ IIITH
                </Typography>
                <Typography
                    variant={isTabletOrMobile ? "body1" : "h6"}
                    color="secondary"
                    fontWeight={400}
                    mt={1}
                >
                    The clubs of IIIT-H conduct various captivating events throughout the year.
                    Students across all UG/PG batches engage in the events, which tells how lively
                    the campus life is! The 23 clubs at IIITH are divided into technical and
                    cultural categories.
                    <Box my={2} />
                    Clubs on campus are run by students, for the students. Club activities help
                    develop new hobbies and interests in students and thereby contributing to the
                    all around development of the students.
                </Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid item>
                        <Statistic number={
                            (clubsData?.clubs?.filter((o) => o.category.toLowerCase() === "technical").length)
                        } title="Technical Clubs" />
                    </Grid>
                    <Grid item>
                        <Statistic number={
                            (clubsData?.clubs?.filter((o) => o.category.toLowerCase() === "cultural").length)
                        } title="Cultural Clubs" />
                    </Grid>
                </Grid>
            </Box>

            <Box mt={6}>
                <Typography variant="h4" color="secondary" fontWeight={500} gutterBottom>
                    Clubs Council @ IIITH
                </Typography>
                <Typography
                    variant={isTabletOrMobile ? "body1" : "h6"}
                    color="secondary"
                    fontWeight={400}
                    mt={1}
                >
                    The Clubs Council is the largest Student Administrative Organization at IIIT
                    Hyderabad, and acts as an umbrella body of all the institute affiliated and
                    associate student-led Clubs, Groups & Societies.
                </Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid item>
                        <Statistic number={
                            (clubsData?.clubs?.filter((o) => o.category.toLowerCase() === "cultural" || o.category.toLowerCase() === "technical").length) + '+'
                        } title="Student-Constituent Groups" />
                    </Grid>
                    <Grid item>
                        <Statistic number="50+" title="Student Coordinators" />
                    </Grid>
                    <Grid item>
                        <Statistic number="250+" title="Organizing Team Members" />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default About;
