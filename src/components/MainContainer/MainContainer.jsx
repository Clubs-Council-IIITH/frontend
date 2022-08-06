import { useContext, useState } from "react";
import { useTheme } from "@mui/styles";

import { AppBar, Box, Toolbar, CssBaseline } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";

import Navigation, { drawerWidth } from "components/Navigation";
import { BackButton } from "components/buttons";

const MainContainer = ({ children }) => {
    const theme = useTheme();
    const { expanded } = useContext(NavigationContext);

    return (
        <Box display="flex">
            <CssBaseline />
            <Navigation />

            <AppBar
                color="transparent"
                elevation={0}
                position="fixed"
                sx={{
                    // default appbar styles
                    zIndex: theme.zIndex.drawer + 1,
                    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
                    [theme.breakpoints.up("sm")]: {
                        width: `calc(100% - ${theme.spacing(11)} - 1px)`,
                    },
                    transition: theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),

                    // expanded appbar styles
                    ...(expanded && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
                        [theme.breakpoints.up("sm")]: {
                            width: `calc(100% - ${drawerWidth}px)`,
                        },
                        transition: theme.transitions.create(["width", "margin"], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                }}
            >
                <Toolbar sx={{ height: "80px" }}>
                    <BackButton />
                </Toolbar>
            </AppBar>

            <>{children}</>
        </Box>
    );
};

export default MainContainer;
