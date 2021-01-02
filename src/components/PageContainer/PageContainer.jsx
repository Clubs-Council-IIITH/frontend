import { useState, createContext } from "react";
import "./styles.scss";

import Navigation from "../Navigation";
import Topbar from "../Topbar";

export const PageContext = createContext(null);

const PageContainer = ({ title, privilege, children }) => {
    const [searchContent, setSearchContent] = useState(null);

    return (
        <div className="page-container">
            <div className="navigation-container">
                <Navigation />
            </div>
            <PageContext.Provider value={{ privilege, searchContent, setSearchContent }}>
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
