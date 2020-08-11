import React from "react";
import ReactLoading from "react-loading";

import Page from "./PageContainer";

const LoadingBar = () => {
    return (
        <Page className="loading-container">
            <ReactLoading type="bars" color="black" />
        </Page>
    );
};

export default LoadingBar;
