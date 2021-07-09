import { useState, useEffect, createContext } from "react";

import AuthService from "services/AuthService";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        (async () => setSession(await AuthService.getSession()))();
    }, []);

    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
