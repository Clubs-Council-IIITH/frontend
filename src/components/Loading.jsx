import { Box, CircularProgress } from "@material-ui/core";

const Loading = () => {
    return (
        <Box width="100%" height="30vh" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Box>
    );
};

export default Loading;
