import { useHistory, useLocation, matchPath } from "react-router-dom";

import { IconButton } from "@mui/material";
import { ArrowBackOutlined as BackIcon } from "@mui/icons-material";

const BackButton = () => {
    const history = useHistory();
    const location = useLocation();

    // render back button only if 2 path levels deep
    return !!matchPath(location.pathname, { path: "/:one/:two" }) ? (
        <IconButton
            onClick={history.goBack}
            sx={{
                backButton: {
                    backgroundColor: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#dddddd",
                    },
                },
            }}
        >
            <BackIcon />
        </IconButton>
    ) : null;
};

export default BackButton;
