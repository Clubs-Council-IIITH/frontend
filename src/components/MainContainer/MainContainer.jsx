import { useState } from "react";
import { useTheme } from "@mui/styles";

import { AppBar, Box, Toolbar, CssBaseline } from "@mui/material";

import Navigation, { drawerWidth } from "components/Navigation";
import { BackButton } from "components/buttons";

const MainContainer = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    return (
        <Box display="flex">
            <CssBaseline />
            <Navigation controller={[open, setOpen]} />

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

                    // open appbar styles
                    ...(open && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
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
