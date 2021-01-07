/**
 * Universal Page Container Component
 *
 * props:
 *  - children (`component`): Required.
 *  - title (`string`): Optional, rendered in Topbar.
 *  - back (`bool`): Option, renders back button instead of menu.
 *  - privilege (`string`): Optional, must belong to ["admin", ].
 *                          Conditionally renders some components.
 *  - component (`component`): Optional. Custom component to render
 *                             on the topbar.
 */

import { useState, useEffect, createContext } from "react";
import "./styles.scss";

import Navigation from "../Navigation";
import Topbar from "../Topbar";

import Updates from "components/Updates";
import BackButton from "components/BackButton";

export const PageContext = createContext(null);

const PageContainer = ({ title, back, privilege, component, children }) => {
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
                    {/* conditionally render back button */}
                    {back && <BackButton />}

                    {/* display updates button icon */}
                    <Updates />

                    {/* if a title or component has been passed, render topbar */}
                    {(title || component) && (
                        <div className={`topbar-container my-1 ${component && "topbar-expand"}`}>
                            <Topbar title={title} component={component} />
                        </div>
                    )}

                    {/* render children */}
                    <div className="content-container">{children}</div>
                </div>
            </PageContext.Provider>
        </div>
    );
};

export default PageContainer;
