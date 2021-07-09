import { useState, createContext } from "react";

export const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
    const [navigation, setNavigation] = useState({});

    return (
        <NavigationContext.Provider value={{ navigation, setNavigation }}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContextProvider;
