import { useState, useContext, useEffect } from "react";
import { useLocation, useHistory, matchPath } from "react-router-dom";
import { useTheme } from "@mui/styles";

import { NavigationContext } from "contexts/NavigationContext";

import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import { MoreVert as ManageIcon } from "@mui/icons-material";

import Profile from "./Profile";

import LogoMini from "assets/img/logo_mini.svg";

const MobileNavigation = ({ topbarHeight }) => {
    const { navigation } = useContext(NavigationContext);

    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    // navigation items to display on the bottom bar
    const navItems = ["Home", "Clubs", "Student Bodies", "Calendar"];

    // control bottom drawer
    const [drawer, setDrawer] = useState(false);

    // control navigation bar item
    const [value, setValue] = useState(location.pathname);
    useEffect(() => {
        const navPaths = navigation?.publicRoutes
            ?.filter((i) => navItems?.includes(i.title))
            ?.map((i) => i.path);

        // if current path matches any navItems path activate its icon; else activate 'more'
        setValue("more");
        navPaths?.forEach((path) => {
            if (
                location.pathname === path ||
                matchPath(location.pathname, { path: `${path}/:etc` })
            )
                setValue(path);
        });
    }, [location.pathname, navigation]);

    return (
        <>
            <Box
                sx={{
                    height: topbarHeight,
                    color: theme.palette.secondary.main,
                    backgroundColor: "black",
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: 0,
                    zIndex: 999,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <IconButton onClick={() => history.push("/")} sx={{ height: 40, width: 40, mx: 1 }}>
                    <Box component="img" src={LogoMini} alt="" width="20px" />
                </IconButton>
                <Box mx={2}>
                    <Profile />
                </Box>
            </Box>
            <BottomNavigation
                value={value}
                onChange={(_, path) => (path !== "more" ? history.push(path) : null)} // don't change path when pressing the 'more' button
                sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 999 }}
            >
                {navigation?.publicRoutes
                    ?.filter((item) => navItems.includes(item.title))
                    ?.map(({ path, icon: Icon }, idx) => (
                        <BottomNavigationAction
                            key={idx}
                            value={path}
                            icon={<Icon />}
                            sx={{
                                "&.MuiBottomNavigationAction-root": {
                                    color: theme.palette.secondary.dark,
                                },
                                "&.Mui-selected": {
                                    color: theme.palette.primary.main,
                                },
                            }}
                        />
                    ))}
                <BottomNavigationAction
                    value="more"
                    icon={<ManageIcon />}
                    sx={{
                        "&.MuiBottomNavigationAction-root": {
                            color: theme.palette.secondary.dark,
                        },
                        "&.Mui-selected": {
                            color: theme.palette.primary.main,
                        },
                    }}
                    component={IconButton}
                    onClick={() => setDrawer(true)}
                />
            </BottomNavigation>

            <Drawer anchor={"bottom"} open={drawer} onClose={() => setDrawer(false)}>
                {Object.keys(navigation).map(
                    (category, cidx) =>
                        !!navigation[category]?.length && (
                            <div key={cidx}>
                                <List style={{ margin: "0 1em" }}>
                                    {navigation[category]
                                        ?.filter((i) => !navItems.includes(i.title))
                                        ?.map(({ title, path, icon: Icon }, iidx) => (
                                            <ListItem key={iidx}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        history.push(path);
                                                        setDrawer(false);
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={title} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                        )
                )}
            </Drawer>
        </>
    );
};

export default MobileNavigation;
