import { Box, Typography } from "@material-ui/core";
import ShrugSVG from "assets/img/shrug.svg";

const Empty = () => {
    return (
        <Box
            p={10}
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box mb={1}>
                <img src={ShrugSVG} alt="" width="160px" />
            </Box>
            <Typography color="textSecondary">there's nothing here... yet.</Typography>
        </Box>
    );
};

export default Empty;
