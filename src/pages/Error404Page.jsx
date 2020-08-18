import React from "react";

import Page from "../components/PageContainer";

const Error404Page = () => {
    return (
        <Page>
            <div className="error-page">
                <img src="/404.svg" alt="404" className="error-banner" />
                <div className="error-msg mt-4 mt-md-5"> page not found </div>
            </div>
        </Page>
    );
};

export default Error404Page;
