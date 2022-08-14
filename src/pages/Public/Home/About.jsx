import { useTheme } from "@mui/styles";

import { Box, Typography } from "@mui/material";

const About = () => {
    const theme = useTheme();

    return (
        <Box px={5} py={8} backgroundColor={theme.palette.primary.main}>
            <Typography variant="h4" color="secondary" fontWeight={500} mb={4}>
                Clubs Council @ IIITH
            </Typography>
            <Typography variant="h6" color="secondary" fontWeight={400}>
                <i>
                    The Clubs Council is the largest Student Administrative Organization at IIIT Hyderabad,
                    and acts as an umbrella body of all the institute affiliated and associate student-led
                    Clubs, Groups & Societies.
                </i>
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 2 Secretaries
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 5 Undersecretaries
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 3 Tech Team Members
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 23+ Student constituent groups, with more being planned.
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 50+ Student Coordinators
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2B24'} 250+ Organizing team members
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
            </Typography>
            <Typography variant="h4" color="secondary" fontWeight={500} mb={4}>
                Clubs @ IIITH
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2192'} 7 Technical Clubs
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2192'} 16 Cultural Clubs
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                {'\u2192'} More coming soon....
            </Typography>
        </Box>
    );
};

export default About;
