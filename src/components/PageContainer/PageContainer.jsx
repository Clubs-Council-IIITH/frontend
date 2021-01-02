import "./styles.scss";

import Navigation from "../Navigation";
import Topbar from "../Topbar";

const PageContainer = ({ children }) => {
    return (
        <div className="page-container">
            <div className="navigation-container">
                <Navigation />
            </div>
            <div className="main-container">
                <div className="topbar-container">
                    <Topbar />
                </div>
                <div className="content-container">{children}</div>
            </div>
        </div>
    );
};

export default PageContainer;
