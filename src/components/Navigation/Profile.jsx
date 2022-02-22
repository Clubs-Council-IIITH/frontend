import { useContext } from "react";
import { makeStyles } from "@mui/styles";

import { Button, Box, Avatar, IconButton } from "@mui/material";
import { ExitToAppOutlined as AuthIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";

import AuthEndpoints from "constants/AuthEndpoints";

// styles {{{
const useStyles = makeStyles(() => ({
    profile: {
        backgroundColor: "#181818",
    },
    avatar: {
        width: "1.6em",
        height: "1.6em",
        backgroundColor: "#fefefe",
        color: "#888888",
    },
    name: {
        fontSize: "1.05em",
        fontWeight: 500,
        color: "#fefefe",
    },
    email: {
        lineHeight: "1.2em",
        fontSize: "1em",
        color: "#a3a3a3",
    },
}));
// }}}

const Login = async () => {
    window.location.href = AuthEndpoints.login;
};

const Logout = async () => {
    window.location.href = AuthEndpoints.logout;
};

const Profile = () => {
    const classes = useStyles();
    const { session } = useContext(SessionContext);

    return (
        <Box p={1} className={classes.profile}>
            {session?.isAuthenticated ? (
                <>
                    <Box display="flex" justifyContent="space-between">
                        <Box my={1} mx={1} display="flex" alignItems="center">
                            <Avatar src="" className={classes.avatar} />
                            <Box mx={1.5}>
                                <Box className={classes.name}>{session.username.split("@")[0]}</Box>
                                <Box className={classes.email}>
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
