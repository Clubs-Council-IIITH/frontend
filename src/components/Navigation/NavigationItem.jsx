import { useState, useEffect } from "react";
import { useLocation, useHistory, matchPath } from "react-router-dom";
import { useTheme } from "@mui/styles";

import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const NavigationItem = ({ title, path, icon: Icon }) => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

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
            sx={{
                // default navigation item
                margin: "0.2em 0",
                borderRadius: theme.borderRadius,
                backgroundColor: "#26262600",
                "&:hover": {
                    backgroundColor: "#26262666",
                },

                // active navigation item
                ...(selected && {
                    backgroundColor: "#212121ff",
                    "&.Mui-selected": {
                        backgroundColor: "#212121ff",
                        "&:hover": {
                            backgroundColor: "#212121ff",
                        },
                    },
                }),
            }}
        >
            <ListItemIcon>
                <Icon
                    sx={{
                        // default icon
                        color: "#777777",
                        fontSize: "1.4em",

                        // active icon
                        ...(selected && {
                            color: "#fefefe",
                        }),
                    }}
                />
            </ListItemIcon>
            <ListItemText>
                <Box
                    sx={{
                        // default text
                        fontFamily: theme.typography.fontFamilySecondary,
                        fontWeight: 600,
                        textTransform: "capitalize",
                        fontSize: "0.9em",
                        color: "#777777",

                        // active text
                        ...(selected && {
                            color: "#fefefe",
                        }),
                    }}
                >
                    {title}
                </Box>
            </ListItemText>
        </ListItem>
    );
};

export default NavigationItem;
