import { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";

import { NavigationContext } from "contexts/NavigationContext";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { SettingsOutlined as ManageIcon } from "@mui/icons-material";

const MobileNavigation = () => {
    const { navigation } = useContext(NavigationContext);

    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    useEffect(() => setValue(location.pathname), [location.pathname]);

    // navigation items to display on the bottom bar
    const navItems = ["Home", "Clubs", "Student Bodies", "Calendar"];

    return (
        <BottomNavigation
            value={value}
            onChange={(_, path) => history.push(path)}
            sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 999 }}
        >
            {navigation?.publicRoutes
                ?.filter((item) => navItems.includes(item.title))
                ?.map(({ path, icon: Icon }, idx) => (
                    <BottomNavigationAction
                        key={idx}
                        value={path}
                        icon={<Icon />}
                        sx={{
                            "&.MuiBottomNavigationAction-root": {
                                color: theme.palette.secondary.dark,
                            },
                            "&.Mui-selected": {
                                color: theme.palette.primary.main,
                            },
                        }}
                    />
                ))}
            <BottomNavigationAction
                icon={<ManageIcon />}
                sx={{
                    "&.MuiBottomNavigationAction-root": {
                        color: theme.palette.secondary.dark,
                    },
                    "&.Mui-selected": {
                        color: theme.palette.primary.main,
                    },
                }}
            />
        </BottomNavigation>
    );
};

export default MobileNavigation;
