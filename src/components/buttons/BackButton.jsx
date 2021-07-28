import { useHistory, useLocation, matchPath } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { IconButton } from "@material-ui/core";
import { ArrowBackOutlined as BackIcon } from "@material-ui/icons";

// styles {{{
const useStyles = makeStyles({
    backButton: {
        backgroundColor: "#ffffff",
        "&:hover": {
            backgroundColor: "#dddddd",
        },
    },
});
// }}}

const BackButton = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    // render back button only if 2 path levels deep
    return !!matchPath(location.pathname, { path: "/:one/:two" }) ? (
        <IconButton className={classes.backButton} onClick={history.goBack}>
            <BackIcon />
        </IconButton>
    ) : null;
};

export default BackButton;
