import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";

import ClubService from "services/ClubService";

const About = () => {
    const { clubId } = useParams();

    const [club, setClub] = useState({ loading: true });

    // fetch club details from API
    useEffect(() => {
        (async () => setClub(await ClubService.getClub(clubId)))();
    }, [clubId]);

    return (
        <Box p={3}>
            <Typography>{club?.data?.description}</Typography>
        </Box>
    );
};

export default About;
