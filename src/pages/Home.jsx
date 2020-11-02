import React from "react";

import Transition from "../components/TransitionContainer";

const Home = () => {
    return (
        <Transition>
            <div className="error-page">
                <img src="/hello.svg" alt="hello" className="hello-banner" />
                <div className="hello-msg mt-5 mx-2">
                    <div className="hello-header">hello there! </div>
                    this page is still under construction. <br />
                    why don't you check out the other pages meanwhile? <br />
                </div>
            </div>
        </Transition>
    );
};

export default Home;
