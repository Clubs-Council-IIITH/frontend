import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Container, Typography, Fade } from "@material-ui/core";

// styles {{{
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2, 1),
    },
}));
// }}}

const Page = ({ header, loading, empty, full, children }) => {
    const classes = useStyles();

    return (
        <main className={clsx({ [classes.content]: !full })}>
            <div className={clsx({ [classes.toolbar]: !full })} />
            <Container maxWidth={null} disableGutters={full}>
                <Typography variant="h2"> {header} </Typography>
                <Box mt={full ? 0 : 5} mb={full ? 0 : 3}>
                    {loading ? (
                        <div> loading... </div>
                    ) : empty ? (
                        <div> empty! </div>
                    ) : (
                        <Fade in timeout={250}>
                            <div>{children}</div>
                        </Fade>
                    )}
                </Box>
            </Container>
        </main>
    );
};

export default Page;
