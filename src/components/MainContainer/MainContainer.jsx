import { useContext } from "react";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "react-responsive";

import { AppBar, Box, Toolbar, CssBaseline } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";

import Navigation, { topbarHeight, drawerWidth } from "components/Navigation";
import { BackButton } from "components/buttons";

const MainContainer = ({ children }) => {
    const theme = useTheme();
    const { expanded } = useContext(NavigationContext);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <Box display="flex">
            <CssBaseline />
            <Navigation />

            <AppBar
                color="transparent"
                elevation={0}
                position="fixed"
                sx={
                    isTabletOrMobile
                        ? {
                              // default appbar styles for mobile
                              marginTop: `${topbarHeight}px`,
                              zIndex: theme.zIndex.drawer + 1,
                              width: "100%",
                              transition: theme.transitions.create(["width", "margin"], {
                                  easing: theme.transitions.easing.sharp,
                                  duration: theme.transitions.duration.leavingScreen,
                              }),
                              pointerEvents: "none",
                          }
                        : {
                              // default appbar styles for desktop
                              zIndex: theme.zIndex.drawer + 1,
                              width: `calc(100% - ${theme.spacing(7)} + 1px)`,
                              [theme.breakpoints.up("sm")]: {
                                  width: `calc(100% - ${theme.spacing(11)} - 1px)`,
                              },
                              transition: theme.transitions.create(["width", "margin"], {
                                  easing: theme.transitions.easing.sharp,
                                  duration: theme.transitions.duration.leavingScreen,
                              }),
                              pointerEvents: "none",

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
                          }
                }
            >
                <Toolbar sx={{ height: "80px" }}>
                    <BackButton sx={{ pointerEvents: "auto" }} />
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    mt: `${isTabletOrMobile ? topbarHeight : 0}px`,
                    mb: isTabletOrMobile ? 5 : 0,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainContainer;
