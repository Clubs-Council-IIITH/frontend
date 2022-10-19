import { useState, useContext } from "react";
import { useTheme } from "@mui/styles";

import { Button, Menu, MenuItem, Box, Avatar, IconButton } from "@mui/material";
import { LoginOutlined as LoginIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";

const MobileProfile = ({ Login, Logout }) => {
    const theme = useTheme();
    const { session } = useContext(SessionContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuOpen = (e) => {
        setMenuOpen(true);
        setMenuAnchor(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
        setMenuAnchor(null);
    };

    return session?.isAuthenticated ? (
        <>
            <IconButton onClick={handleMenuOpen}>
                <Avatar
                    src=""
                    sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: "#fefefe",
                        color: "#888888",
                    }}
                />
            </IconButton>
            <Menu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
            >
                <Box
                    p={1}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    <Box my={1} mx={1} display="flex" alignItems="center">
                        <Avatar
                            src=""
                            sx={{
                                width: "1.6em",
                                height: "1.6em",
                                backgroundColor: "#fefefe",
                                color: theme.palette.primary.light,
                            }}
                        />
                        <Box mx={1.5}>
                            <Box
                                sx={{
                                    fontSize: "0.9em",
                                    fontWeight: 500,
                                    color: theme.palette.secondary.light,
                                }}
                            >
                                {session.username.split("@")[0]}
                            </Box>
                            <Box
                                sx={{
                                    lineHeight: "1.2em",
                                    fontSize: "0.8em",
                                    color: theme.palette.secondary.dark,
                                }}
                            >
                                @{session.username.split("@")[1]}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <MenuItem
                    onClick={() => {
                        Logout();
                        handleMenuClose();
                    }}
                >
                    <Button fullWidth color="secondary" variant="outlined">
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
        </>
    ) : (
        <IconButton onClick={Login}>
            <LoginIcon color="secondary" />
        </IconButton>
    );
};

export default MobileProfile;
