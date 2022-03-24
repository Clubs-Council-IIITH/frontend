import { useState, useEffect, createContext } from "react";

import { useQuery } from "@apollo/client";
import { GET_SESSION } from "queries/auth";
import AuthModel from "models/AuthModel";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const { data } = useQuery(GET_SESSION);
    const [session, setSession] = useState(null);
    useEffect(() => setSession(new AuthModel(data?.payload)), [data]);

    useEffect(() => console.log("session:", session), [session]);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
