import React from "react";

import Page from "../components/PageContainer";

const Error401Page = () => {
    return (
        <Page>
            <div className="error-page">
                <img src="/401.svg" alt="401" className="e401-banner ml-n3 ml-md-n5" />
                <div className="error-msg mt-4 mt-md-5"> unauthorized. </div>
            </div>
        </Page>
    );
};

export default Error401Page;
