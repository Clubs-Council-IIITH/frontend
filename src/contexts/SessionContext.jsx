import { useState, useEffect, createContext } from "react";

import { useQuery } from "@apollo/client";
import { GET_SESSION } from "queries/auth";
import UserModel from "models/UserModel";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const { data } = useQuery(GET_SESSION);
    const [session, setSession] = useState(null);
    useEffect(() => setSession(new UserModel(data?.payload)), [data]);

    useEffect(() => console.log("session:", session), [session]);

    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
