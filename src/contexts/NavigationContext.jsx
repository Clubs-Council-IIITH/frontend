import { useState, createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
    const [navigation, setNavigation] = useState({});
    const [expanded, setExpanded] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <NavigationContext.Provider
            value={{ navigation, setNavigation, expanded, setExpanded, isTabletOrMobile }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContextProvider;
