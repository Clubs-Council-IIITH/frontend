import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Drawer, List, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import NavigationItem from "./NavigationItem";

// styles {{{
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

const Navigation = ({ navigation, open, setOpen }) => {
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? (
                        <ChevronLeft style={{ color: "black" }} />
                    ) : (
                        <ChevronRight style={{ color: "black" }} />
                    )}
                </IconButton>
            </div>
            <Box my={4}>
                <List>
                    {navigation.map((item, idx) => (
                        <NavigationItem key={idx} {...item} />
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Navigation;
