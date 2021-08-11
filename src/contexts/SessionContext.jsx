import { useEffect, createContext } from "react";
import { Session } from "services/AuthServiceJWT";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const { data: session } = Session();

    useEffect(() => console.log("session:", session), [session]);

    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
