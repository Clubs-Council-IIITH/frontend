import clsx from "clsx";

import { useState, useEffect } from "react";
import { useLocation, useHistory, matchPath } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

// styles {{{
const useStyles = makeStyles((theme) => ({
    navigationItem: {
        margin: "0.2em 0",
        borderRadius: "6px",
        backgroundColor: "#26262600",
        "&:hover": {
            backgroundColor: "#26262666",
        },
    },
    navigationItemActive: {
        backgroundColor: "#212121ff",
        "&.Mui-selected": {
            backgroundColor: "#212121ff",
            "&:hover": {
                backgroundColor: "#212121ff",
            },
        },
    },
    navigationItemIcon: {
        color: "#777777",
    },
    navigationItemIconActive: {
        color: "#fefefe",
    },
    navigationItemText: {
        fontFamily: theme.typography.fontFamilySecondary,
        fontWeight: 600,
        textTransform: "capitalize",
        color: "#777777",
    },
    navigationItemTextActive: {
        color: "#fefefe",
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
            disableRipple
            selected={selected}
            onClick={() => history.push(path)}
            className={clsx(classes.navigationItem, {
                [classes.navigationItemActive]: selected,
            })}
        >
            <ListItemIcon>
                <Icon
                    classes={{
                        root: clsx(classes.navigationItemIcon, {
                            [classes.navigationItemIconActive]: selected,
                        }),
                    }}
                />
            </ListItemIcon>
            <ListItemText
                classes={{
                    primary: clsx(classes.navigationItemText, {
                        [classes.navigationItemTextActive]: selected,
                    }),
                }}
            >
                {title}
            </ListItemText>
        </ListItem>
    );
};

export default NavigationItem;
