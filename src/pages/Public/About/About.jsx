import { useTheme } from "@mui/styles";

import { IconButton, Avatar, Box, Grid, Card, Typography } from "@mui/material";
import { AlternateEmail } from "@mui/icons-material";

import Page from "components/Page";

import TeamJSON from "./cc_members.json";

const TeamCard = ({ name, img, role, email }) => {
    const theme = useTheme();

    return (
        <Card variant="none">
            <Box p={2} display="flex" flexDirection="column" alignItems="center">
                <Avatar src={img} sx={{ height: 160, width: 160 }} />
                <Typography variant="h6" sx={{ mt: 2, width: "100%", textAlign: "center" }}>
                    {`${name.first} ${name.last}`}
                </Typography>
                <Typography variant="body1" color={theme.palette.secondary.dark}>
                    {role}
                </Typography>
                <IconButton component="a" href={`mailto:${email}`}>
                    <AlternateEmail fontSize="small" />
                </IconButton>
            </Box>
        </Card>
    );
};

const About = () => {
    const theme = useTheme();

    return (
        <Page noToolbar header={"About Clubs Council"} loading={false} empty={false}>
            <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom mt={4}>
                WHAT DO WE DO?
            </Typography>
            <Typography variant="body1" fontWeight={400}>
                As a constituent body of the <i>Students' Life Committee</i> (SLC), the Clubs
                Council oversees all the student-driven activities and the functioning of the clubs.
                It handles the annual budget of clubs, events, coordinates among different clubs and
                helps in creating new clubs, societies and special interest groups.
            </Typography>
            <Typography variant="body1" mt={1} fontWeight={400}>
                The Clubs Council works closely with the institute's Students' Life Office, Finance
                Council, Outreach, IT Offices, SLC and SAC faculty members, and all other student
                administrative bodies.
            </Typography>
            <Typography variant="body1" mt={1} fontWeight={400}>
                The primary aim of the Clubs Council is to ensure that all student-driven
                organizations on campus are successful in their aim to cultivate diverse campus life
                experiences throughout the year, and enrich the thriving campus community outside
                the classroom, while fostering inclusion.
            </Typography>

            <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom mt={4}>
                EXECUTIVE BOARD
            </Typography>
            <Grid container spacing={1}>
                {TeamJSON.map((member, key) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={key}>
                        <TeamCard {...member} />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom mt={4}>
                THE CC TEAM
            </Typography>
            <Typography variant="body1" fontWeight={400}>
                The Club Coordinators are an essential part of the Clubs Council, and they come
                together to collaboratively organise and provide an extraordinary range of
                opportunities through the form of various events, enabling students to pursue their
                hobbies and develop their extra-curricular skills.
            </Typography>
            <Typography variant="body1" mt={1} fontWeight={400}>
                And then come the Club Members, who play an important role in design, development
                and execution of any event organised by the clubs, and contribute to the betterment
                of Students' Life at IIIT, Hyderabad.
            </Typography>
        </Page>
    );
};

export default About;
