import { useTheme } from "@mui/styles";
import { useHistory, useLocation, matchPath } from "react-router-dom";

import { IconButton } from "@mui/material";
import { ArrowBackOutlined as BackIcon } from "@mui/icons-material";

const BackButton = ({ sx }) => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    // render back button only if 2 path levels deep
    return !!matchPath(location.pathname, { path: "/:one/:two" }) ? (
        <IconButton
            onClick={history.goBack}
            sx={{
                border: 2,
                backgroundColor: "white",
                "&:hover": { backgroundColor: theme.palette.secondary.main },
                ...sx,
            }}
        >
            <BackIcon />
        </IconButton>
    ) : null;
};

export default BackButton;
