import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SWRConfig } from "swr";

import NavigationContextProvider from "contexts/NavigationContext";
import SessionContextProvider from "contexts/SessionContext";

ReactDOM.render(
    <React.StrictMode>
        <SWRConfig value={{ revalidateOnFocus: false }}>
            <SessionContextProvider>
                <NavigationContextProvider>
                    <App />
                </NavigationContextProvider>
            </SessionContextProvider>
        </SWRConfig>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
