import { useContext } from "react";

import { Button, Box, Avatar } from "@material-ui/core";

import { SessionContext } from "contexts/SessionContext";

// TODO: implement logout
import { Login } from "services/AuthServiceJWT";

const Profile = () => {
    const { session } = useContext(SessionContext);

    return (
        <Box m={3}>
            {session?.isAuthenticated ? (
                <>
                    <Box my={2} display="flex" alignItems="center">
                        <Avatar
                            src=""
                            style={{ backgroundColor: "#111", width: "1.8em", height: "1.8em" }}
                        />
                        <Box mx={1}>
                            <Box fontSize="1.4em" lineHeight="1.1em">
                                {session.username.split("@")[0]}
                            </Box>
                            <Box>@{session.username.split("@")[1]}</Box>
                        </Box>
                    </Box>
                    <Button fullWidth variant="outlined" onClick={() => null}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button fullWidth variant="outlined" onClick={Login}>
                    Login
                </Button>
            )}
        </Box>
    );
};

export default Profile;
