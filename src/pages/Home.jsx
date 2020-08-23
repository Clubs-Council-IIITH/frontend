import React from "react";

import Page from "../components/PageContainer";

const Home = () => {
    return (
        <Page fluid>
            <div className="error-page mt-4">
                <img src="/hello.svg" alt="hello" className="hello-banner" />
                <div className="hello-msg mt-5">
                    <div className="hello-header">hello there! </div>
                    this page is still under construction. <br />
                    why don't you check out the other pages meanwhile? <br />
                </div>
            </div>
        </Page>
    );
};

export default Home;
