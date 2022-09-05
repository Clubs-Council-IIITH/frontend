import { useState, createContext } from "react";

export const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
    const [navigation, setNavigation] = useState({});
    const [expanded, setExpanded] = useState(false);

    return (
        <NavigationContext.Provider value={{ navigation, setNavigation, expanded, setExpanded }}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContextProvider;
