import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Page from "components/Page";
import { Box, Typography } from "@material-ui/core";

import ClubService from "services/ClubService";

const About = () => {
    const { clubId } = useParams();

    const [club, setClub] = useState({ loading: true });

    // fetch club details from API
    useEffect(() => {
        (async () => setClub(await ClubService.getClubById(clubId)))();
    }, [clubId]);

    return (
        <Page full>
            <Box py={4} px={2}>
                <Typography>{club?.data?.description}</Typography>
            </Box>
        </Page>
    );
};

export default About;
