import React, { createContext, useState, useEffect } from "react";

import API from "./methods";

export const SessionContext = createContext();

export default ({ children }) => {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getSession() {
            const response = await API.session();
            setSession(response.data);
            setIsLoading(false);
        }

        getSession();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? null : (
                <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
            )}
        </React.Fragment>
    );
};
