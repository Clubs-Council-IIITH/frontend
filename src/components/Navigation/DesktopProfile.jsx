import { useContext } from "react";

import { Button, Box, Avatar, IconButton } from "@mui/material";
import { ExitToAppOutlined as AuthIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";

const DesktopProfile = ({ Login, Logout }) => {
    const { session } = useContext(SessionContext);

    return (
        <Box
            p={1}
            sx={{
                backgroundColor: "#181818",
            }}
        >
            {session?.isAuthenticated ? (
                <>
                    <Box display="flex" justifyContent="space-between">
                        <Box my={1} mx={1} display="flex" alignItems="center">
                            <Avatar
                                src=""
                                sx={{
                                    width: "1.6em",
                                    height: "1.6em",
                                    backgroundColor: "#fefefe",
                                    color: "#888888",
                                }}
                            />
                            <Box mx={1.5}>
                                <Box
                                    sx={{
                                        fontSize: "0.9em",
                                        fontWeight: 500,
                                        color: "#fefefe",
                                    }}
                                >
                                    {session.username.split("@")[0]}
                                </Box>
                                <Box
                                    sx={{
                                        lineHeight: "1.2em",
                                        fontSize: "0.8em",
                                        color: "#a3a3a3",
                                    }}
                                >
                                    @{session.username.split("@")[1]}
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <IconButton size="small" onClick={Logout}>
                                <AuthIcon color="secondary" fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </>
            ) : (
                <Button fullWidth variant="text" color="secondary" onClick={Login}>
                    <Box display="flex" mx={0.5}>
                        <AuthIcon fontSize="small" />
                    </Box>
                    Login
                </Button>
            )}
        </Box>
    );
};

export default DesktopProfile;