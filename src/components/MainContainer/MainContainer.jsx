import clsx from "clsx";

import { useState } from "react";
import { makeStyles } from "@mui/styles";

import { AppBar, Toolbar, CssBaseline } from "@mui/material";

import Navigation, { drawerWidth } from "components/Navigation";
import { BackButton } from "components/buttons";

// styles {{{
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${theme.spacing(11) + 1}px)`,
        },
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
                <Toolbar style={{ height: "80px" }}>
                    <BackButton />
                </Toolbar>
            </AppBar>

            <>{children}</>
        </div>
    );
};

export default MainContainer;
