import clsx from "clsx";

import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Box, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// styles {{{
const useStyles = makeStyles((theme) => ({
    navigationItemInactive: {
        borderLeft: "3px solid #00000000",
    },
    navigationItemActive: {
        borderLeft: "3px solid #000000ff",
    },
    navigationItemIcon: {
        color: "black",
    },
    navigationItemText: {
        fontFamily: theme.typography.fontFamilySecondary,
        fontWeight: 600,
        textTransform: "capitalize",
    },
}));
// }}}

const NavigationItem = ({ title, path, icon: Icon }) => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    return (
        <ListItem
            button
            selected={location.pathname === path}
            onClick={() => history.push(path)}
            className={clsx({
                [classes.navigationItemActive]: location.pathname === path,
                [classes.navigationItemInactive]: location.pathname !== path,
            })}
        >
            <Box display="flex" alignItems="center" mx={2}>
                <ListItemIcon>
                    <Icon classes={{ root: classes.navigationItemIcon }} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.navigationItemText }}>
                    {title}
                </ListItemText>
            </Box>
        </ListItem>
    );
};

export default NavigationItem;
