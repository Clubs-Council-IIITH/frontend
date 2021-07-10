import { useState, useEffect } from "react";

import { Box, Grid, Container, Typography, Grow } from "@material-ui/core";

import ClubService from "services/ClubService";

import ClubCard from "components/ClubCard";

const Clubs = () => {
    const [clubs, setClubs] = useState({ loading: true });

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Container maxWidth={null}>
            <Typography variant="h2"> Clubs </Typography>
            <Box my={4}>
                {clubs?.loading ? (
                    <div> loading... </div>
                ) : !clubs?.data.length ? (
                    <div> empty! </div>
                ) : (
                    <Grow in timeout={250} style={{ transformOrigin: "50vw 0" }}>
                        <Grid container spacing={2}>
                            {clubs?.data.map((club, idx) => (
                                <Grid item md={4} lg={3} key={idx}>
                                    <ClubCard {...club} />
                                </Grid>
                            ))}
                            {clubs?.data.map((club, idx) => (
                                <Grid item md={4} lg={3} key={idx}>
                                    <ClubCard {...club} />
                                </Grid>
                            ))}
                            {clubs?.data.map((club, idx) => (
                                <Grid item md={4} lg={3} key={idx}>
                                    <ClubCard {...club} />
                                </Grid>
                            ))}
                            {clubs?.data.map((club, idx) => (
                                <Grid item md={4} lg={3} key={idx}>
                                    <ClubCard {...club} />
                                </Grid>
                            ))}
                            {clubs?.data.map((club, idx) => (
                                <Grid item md={4} lg={3} key={idx}>
                                    <ClubCard {...club} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grow>
                )}
            </Box>
        </Container>
    );
};

export default Clubs;
