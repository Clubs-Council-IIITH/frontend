import { Box, Typography } from "@mui/material";

import Page from "components/Page";

import Error404SVG from "assets/img/404.svg";

const Error404 = () => {
    return (
        <Page>
            <Box
                p={4}
                width="100%"
                height="60vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Box mb={3}>
                    <img
                        src={Error404SVG}
                        alt="404: Page Not Found"
                        width="350px"
                        style={{ maxWidth: "80vw" }}
                    />
                </Box>
                <Typography variant="h5" color="textSecondary">
                    page not found.
                </Typography>
            </Box>
        </Page>
    );
};

export default Error404;
