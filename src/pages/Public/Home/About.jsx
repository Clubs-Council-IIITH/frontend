import { useTheme } from "@mui/styles";

import { Box, Typography } from "@mui/material";

const About = () => {
    const theme = useTheme();

    return (
        <Box p={5} backgroundColor={theme.palette.primary.main}>
            <Typography variant="h4" color="secondary" fontWeight={500} mb={4}>
                Clubs @ IIITH
            </Typography>
            <Typography variant="h6" color="secondary" fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
                vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda
                officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam
                deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione
                temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                cupiditate dolore doloribus!
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
                vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda
                officia quibusdam deleniti eos cupiditate dolore doloribus!
            </Typography>
            <Typography variant="h6" color="secondary" mt={3} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
                vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda
                officia quibusdam deleniti eos cupiditate dolore doloribus!
            </Typography>
        </Box>
    );
};

export default About;
