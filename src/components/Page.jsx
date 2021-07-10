import { Box, Container, Typography, Fade } from "@material-ui/core";

const Page = ({ header, loading, empty, children }) => {
    return (
        <Container maxWidth={null}>
            <Typography variant="h2"> {header} </Typography>
            <Box my={8}>
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
