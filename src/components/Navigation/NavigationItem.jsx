import clsx from "clsx";

import { useState, useEffect } from "react";
import { useLocation, useHistory, matchPath } from "react-router-dom";
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

    const [selected, setSelected] = useState(false);
    useEffect(() => {
        setSelected(
            location.pathname === path || !!matchPath(location.pathname, { path: `${path}/:etc` })
        );
    }, [location.pathname]);

    return (
        <ListItem
            button
            selected={selected}
            onClick={() => history.push(path)}
            className={clsx({
                [classes.navigationItemActive]: selected,
                [classes.navigationItemInactive]: !selected,
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
