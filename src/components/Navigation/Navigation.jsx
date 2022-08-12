import { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";

import { NavigationContext } from "contexts/NavigationContext";

import {
    Collapse,
    Box,
    Drawer as MuiDrawer,
    Divider,
    Fade,
    List,
    IconButton,
    Typography,
} from "@mui/material";

import NavigationItem from "./NavigationItem";
import Profile from "./Profile";

export const drawerWidth = 240;

// styles {{{
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#111111",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#111111",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(11)} - 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);
// }}}

const Navigation = () => {
    const theme = useTheme();
    const { navigation, expanded, setExpanded } = useContext(NavigationContext);

    return (
        <Drawer
            variant="permanent"
            open={expanded}
            onMouseOver={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {/* drawer header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: theme.spacing(4, 2, 0),
                    // necessary for content to be below app bar
                    ...theme.mixins.toolbar,
                }}
            >
                <IconButton onClick={null}>
                    <Typography variant="h5">
                        <Box fontWeight={500} color="#fefefe">
                            CC
                        </Box>
                    </Typography>
                </IconButton>
            </Box>

            {/* navigation items */}
            <Box my={4}>
                {Object.keys(navigation).map(
                    (category, cidx) =>
                        !!navigation[category].length && (
                            <div key={cidx}>
                                {cidx ? <Divider /> : null}
                                <Fade in>
                                    <List style={{ margin: "0 1em" }}>
                                        {navigation[category].map((item, iidx) => (
                                            <NavigationItem key={iidx} {...item} />
                                        ))}
                                    </List>
                                </Fade>
                            </div>
                        )
                )}
            </Box>

            {/* profile */}
            <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1}>
                <Collapse in={expanded}>{!!expanded && <Profile />}</Collapse>
            </Box>
        </Drawer>
    );
};

export default Navigation;
