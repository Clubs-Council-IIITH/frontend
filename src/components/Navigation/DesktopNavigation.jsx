import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

import { NavigationContext } from "contexts/NavigationContext";

import { Collapse, Box, Drawer as MuiDrawer, Divider, Fade, List, IconButton } from "@mui/material";

import NavigationItem from "./DesktopNavigationItem";
import Profile from "./Profile";

import LogoMini from "assets/img/logo_mini.svg";

// styles {{{
const openedMixin = (theme, width) => ({
    width: width,
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
        width: `calc(${theme.spacing(11)} - 10px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open, width }) => ({
        width: width,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme, width),
            "& .MuiDrawer-paper": openedMixin(theme, width),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);
// }}}

const DesktopNavigation = ({ drawerWidth }) => {
    const theme = useTheme();
    const history = useHistory();
    const { navigation, expanded, setExpanded } = useContext(NavigationContext);

    return (
        <Drawer
            variant="permanent"
            open={expanded}
            onMouseOver={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            width={drawerWidth}
        >
            {/* drawer header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: theme.spacing(3, 2, 0),
                    // necessary for content to be below app bar
                    ...theme.mixins.toolbar,
                }}
            >
                <IconButton onClick={() => history.push("/")} sx={{ height: 40, width: 40 }}>
                    <Box component="img" src={LogoMini} alt="" width="20px" />
                </IconButton>
            </Box>

            {/* navigation items */}
            <Box my={1}>
                {Object.keys(navigation).map(
                    (category, cidx) =>
                        !!navigation[category].length && (
                            <div key={cidx}>
                                {cidx ? <Divider /> : null}
                                <Fade in>
                                    <List style={{ margin: "0 0.8em" }}>
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

export default DesktopNavigation;
