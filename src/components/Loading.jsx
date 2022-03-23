import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box width="100%" height="30vh" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Box>
    );
};

export default Loading;
