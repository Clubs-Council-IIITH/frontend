import React from "react";

const State = (props) => {
    return (
        <React.Fragment>
            <div className={"event-state my-auto px-2 state-" + props.current}>
                {props.current.toUpperCase()}
            </div>
        </React.Fragment>
    );
};

export default State;
