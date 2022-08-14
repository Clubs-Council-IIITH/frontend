import { useTheme } from "@mui/styles";

import { Box, Typography } from "@mui/material";
import Page from "components/Page";
import UserCard from "components/cards/userCards";
// import TwitterIcon from "assets/img/404.svg";

const About = () => {
    const theme = useTheme();

    return (
        <Page noToolbar header={"About Clubs Council"} loading={false} empty={false}>
            {/* <img src={TwitterIcon} alt="description" /> */}
            <Typography variant="h6" fontWeight={400}>
                As a constituent body of the <i>Students{"\u2019"} Life Committee</i> (SLC),
                the Clubs Council oversees all the student-driven activities and the functioning of the clubs.
                It handles the annual budget of clubs, events, coordinates among different clubs and helps in
                creating new clubs, societies and special interest groups.
            </Typography>
            <Typography variant="h6" mt={3} fontWeight={400}>
                The CC works closely with the institute{"\u2019"}s Students{"\u2019"} Life Office,
                Finance, Outreach, IT Offices, SLC and SAC faculty members and all other student administrative bodies.
            </Typography>
            <Typography variant="h6" mt={3} fontWeight={400}>
                The main aim of the CC is ensuring that all student-driven organizations on campus are successful
                in their aim to cultivate diverse campus life experiences throughout the year, and enrich the
                thriving campus community outside the classroom, while fostering inclusion.
            </Typography>
            
            <UserCard />

            <Typography variant="h4" mt={3} fontWeight={400}>
                Further Members
            </Typography>
            <Typography variant="h6" mt={3} fontWeight={400}>
                The Club Coordinators are an essential part of the Clubs Council, and they come together to collaboratively organise and provide an extraordinary range of opportunities through the form of various events, enabling students to pursue their hobbies and develop their extra-curricular skills.
            </Typography>
            <Typography variant="h6" mt={3} fontWeight={400}>
                And then come the Club Members, who play an important role in design, development and execution of any event organised by the clubs, and contribute to the betterment of Students' Life at IIIT, Hyderabad.
            </Typography>
        </Page>
    );
};

export default About;
