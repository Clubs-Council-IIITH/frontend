import { useHistory, useLocation, matchPath } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { ArrowBackOutlined as BackIcon } from "@material-ui/icons";

const BackButton = () => {
    const history = useHistory();
    const location = useLocation();

    // render back button only if 2 path levels deep
    return !!matchPath(location.pathname, { path: "/:one/:two" }) ? (
        <IconButton onClick={history.goBack}>
            <BackIcon />
        </IconButton>
    ) : null;
};

export default BackButton;
