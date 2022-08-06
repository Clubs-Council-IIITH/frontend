import { useTheme } from "@mui/styles";

import { Box, Typography } from "@mui/material";

const Upcoming = () => {
    const theme = useTheme();
    return (
        <Box px={3} py={4} backgroundColor={theme.palette.grey[100]}>
            <Typography variant="h5" fontWeight={500}>
                Upcoming Events
            </Typography>
        </Box>
    );
};

export default Upcoming;
