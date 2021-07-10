import { Box, Container, Typography, Fade } from "@material-ui/core";

const Page = ({ header, loading, empty, children }) => {
    return (
        <Container maxWidth={null}>
            <Typography variant="h2"> {header} </Typography>
            <Box mt={8} mb={3}>
                {loading ? (
                    <div> loading... </div>
                ) : empty ? (
                    <div> empty! </div>
                ) : (
                    <Fade in timeout={250}>
                        {children}
                    </Fade>
                )}
            </Box>
        </Container>
    );
};

export default Page;
