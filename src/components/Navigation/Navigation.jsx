import clsx from "clsx";

import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { NavigationContext } from "contexts/NavigationContext";

import {
    Collapse,
    Box,
    Drawer,
    Divider,
    Fade,
    List,
    IconButton,
    Typography,
} from "@material-ui/core";

import NavigationItem from "./NavigationItem";
import Profile from "./Profile";

// styles {{{
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(11) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(4, 2, 0),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));
// }}}

const Navigation = ({ controller: [open, setOpen] }) => {
    const classes = useStyles();

    const { navigation } = useContext(NavigationContext);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={() => setOpen(!open)}>
                    <Typography color="textPrimary" variant="h5">
                        <Box fontWeight={500}>CC</Box>
                    </Typography>
                    {/* {open ? ( */}
                    {/*     <ChevronLeft style={{ color: "black" }} /> */}
                    {/* ) : ( */}
                    {/*     <ChevronRight style={{ color: "black" }} /> */}
                    {/* )} */}
                </IconButton>
            </div>
            <Box my={4}>
                {Object.keys(navigation).map(
                    (category, cidx) =>
                        !!navigation[category].length && (
                            <div key={cidx}>
                                {cidx ? <Divider /> : null}
                                <Fade in>
                                    <List>
                                        {navigation[category].map((item, iidx) => (
                                            <NavigationItem key={iidx} {...item} />
                                        ))}
                                    </List>
                                </Fade>
                            </div>
                        )
                )}
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1}>
                <Collapse in={open}>{!!open && <Profile />}</Collapse>
            </Box>
        </Drawer>
    );
};

export default Navigation;
