import { useTheme } from "@mui/styles";

import { Box, Typography } from "@mui/material";
import Page from "components/Page";

const About = () => {
    const theme = useTheme();

    return (
        <Page noToolbar header={"About Clubs Council"} loading={false} empty={false}>
            <Typography variant="h6" fontWeight={400}>
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
            <Typography variant="h6" mt={3} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
                vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda
                officia quibusdam deleniti eos cupiditate dolore doloribus!
            </Typography>
            <Typography variant="h6" mt={3} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
                vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda
                officia quibusdam deleniti eos cupiditate dolore doloribus!
            </Typography>
        </Page>
    );
};

export default About;
