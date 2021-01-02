import { useState, useEffect, createContext } from "react";
import "./styles.scss";

import Navigation from "../Navigation";
import Topbar from "../Topbar";

export const PageContext = createContext(null);

const PageContainer = ({ title, privilege, searchAttr, children }) => {
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
                    searchAttr,
                    searchContent,
                    setSearchContent,
                }}
            >
                <div className="main-container">
                    <div className="topbar-container">
                        <Topbar title={title} />
                    </div>
                    <div className="content-container">{children}</div>
                </div>
            </PageContext.Provider>
        </div>
    );
};

export default PageContainer;
