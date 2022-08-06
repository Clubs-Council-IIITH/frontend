import clsx from "clsx";

import { makeStyles } from "@mui/styles";

import { Box, Container, Typography, Fade } from "@mui/material";

import Loading from "components/Loading";
import Empty from "components/Empty";

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
        padding: theme.spacing(1, 1),
        overflowX: "hidden",
    },
    contentFull: {
        flexGrow: 1,
        overflowX: "hidden",
    },
}));
// }}}

const Page = ({ header, loading, empty, full, noToolbar, children }) => {
    const classes = useStyles();

    return (
        <main className={clsx({ [classes.content]: !full, [classes.contentFull]: full })}>
            <div className={clsx({ [classes.toolbar]: !full && !noToolbar })} />
            <Container maxWidth={null} disableGutters={full}>
                <Typography variant="h3" mt={full ? 0 : noToolbar ? 3 : 2}>
                    {header}
                </Typography>
                <Box mt={full ? 0 : 3} mb={full ? 0 : 3}>
                    {loading ? (
                        <Loading />
                    ) : empty ? (
                        <Empty />
                    ) : (
                        <Fade in timeout={250}>
                            <Box>{children}</Box>
                        </Fade>
                    )}
                </Box>
            </Container>
        </main>
    );
};

export default Page;
