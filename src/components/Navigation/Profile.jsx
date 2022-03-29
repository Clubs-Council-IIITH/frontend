import { useContext } from "react";
import { useMutation } from "@apollo/client";

import { Button, Box, Avatar, IconButton } from "@mui/material";
import { ExitToAppOutlined as AuthIcon } from "@mui/icons-material";

import { GET_SESSION } from "queries/auth";
import { DELETE_COOKIE } from "mutations/auth";
import { SessionContext } from "contexts/SessionContext";

import AuthEndpoints from "constants/AuthEndpoints";

const Profile = () => {
    const { session } = useContext(SessionContext);

    const [deleteCookie, { error: deleteError }] = useMutation(DELETE_COOKIE, {
        refetchQueries: [GET_SESSION],
        onCompleted: () => (window.location.href = AuthEndpoints.logout),
    });

    const Login = async () => {
        window.location.href = AuthEndpoints.login;
    };

    const Logout = async () => {
        deleteCookie();
    };

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

export default Profile;
