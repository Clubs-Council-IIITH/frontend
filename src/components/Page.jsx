import { Box, Container, Typography, Grow } from "@material-ui/core";

const Page = ({ header, loading, empty, children }) => {
    return (
        <Container maxWidth={null}>
            <Typography variant="h2"> {header} </Typography>
            <Box my={4}>
                {loading ? (
                    <div> loading... </div>
                ) : empty ? (
                    <div> empty! </div>
                ) : (
                    <Grow in timeout={250} style={{ transformOrigin: "50vw 0" }}>
                        {children}
                    </Grow>
                )}
            </Box>
        </Container>
    );
};

export default Page;
