import { Box, Typography } from "@material-ui/core";

import Page from "components/Page";

import Error401SVG from "assets/img/401.svg";

const Error401 = () => {
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
                        src={Error401SVG}
                        alt="401: Unauthorized"
                        width="300px"
                        style={{ maxWidth: "80vw" }}
                    />
                </Box>
                <Typography variant="h5" color="textSecondary">
                    unauthorized.
                </Typography>
            </Box>
        </Page>
    );
};

export default Error401;
