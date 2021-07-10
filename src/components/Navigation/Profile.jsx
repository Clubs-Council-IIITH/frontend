import { useContext } from "react";

import { Button, Box, Avatar } from "@material-ui/core";

import { SessionContext } from "contexts/SessionContext";

import AuthService from "services/AuthService";

const Profile = () => {
    const { session } = useContext(SessionContext);

    return (
        <Box m={3}>
            {session?.is_authenticated ? (
                <>
                    <Box my={2} display="flex" alignItems="center">
                        <Avatar
                            src=""
                            style={{ backgroundColor: "#111", width: "1.8em", height: "1.8em" }}
                        />
                        <Box mx={2}>
                            <Box fontSize="1.4em">{session.user.name.split("@")[0]}</Box>
                            <Box>@{session.user.name.split("@")[1]}</Box>
                        </Box>
                    </Box>
                    <Button fullWidth variant="outlined" onClick={() => AuthService.logout()}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button fullWidth variant="outlined" onClick={() => AuthService.login()}>
                    Login
                </Button>
            )}
        </Box>
    );
};

export default Profile;
