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

            <>{children}</>
        </div>
    );
};

export default MainContainer;
