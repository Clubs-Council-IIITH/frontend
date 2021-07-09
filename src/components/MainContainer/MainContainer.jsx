import clsx from "clsx";

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, CssBaseline } from "@material-ui/core";

import Navigation from "components/Navigation";

// styles {{{
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
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
        padding: theme.spacing(2),
    },
}));
// }}}

const MainContainer = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navigation controller={[open, setOpen]} />

            <AppBar
                color="transparent"
                elevation={0}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar />
            </AppBar>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default MainContainer;
