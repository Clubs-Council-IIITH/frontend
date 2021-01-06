/**
 * Universal Page Container Component
 *
 * props:
 *  - children (`component`): Required.
 *  - title (`string`): Optional, rendered in Topbar.
 *  - privilege (`string`): Optional, must belong to ["admin", ].
 *                          Conditionally renders some components.
 *  - component (`component`): Optional. Custom component to render
 *                             on the topbar.
 */

import { useState, useEffect, createContext } from "react";
import updatesIcon from "./assets/updates.svg";
import "./styles.scss";

import { Button } from "reactstrap";
import Navigation from "../Navigation";
import Topbar from "../Topbar";

export const PageContext = createContext(null);

const PageContainer = ({ title, privilege, component, children }) => {
    const [content, setContent] = useState(null);
    const [searchContent, setSearchContent] = useState(null);

    useEffect(() => setSearchContent(content), [content]);

    return (
        <div className="page-container">
            <div className="navigation-container">
                <Navigation />
            </div>
            <PageContext.Provider
                value={{
                    privilege,
                    content,
                    setContent,
                    searchContent,
                    setSearchContent,
                }}
            >
                <div className="main-container">
                    <Button color="light" className="updates-btn rounded-circle">
                        <img src={updatesIcon} alt="updates" className="updates-icon" />
                    </Button>
                    {(title || component) && (
                        <div className={`topbar-container my-1 ${component && "topbar-expand"}`}>
                            <Topbar title={title} component={component} />
                        </div>
                    )}
                    <div className="content-container">{children}</div>
                </div>
            </PageContext.Provider>
        </div>
    );
};

export default PageContainer;
