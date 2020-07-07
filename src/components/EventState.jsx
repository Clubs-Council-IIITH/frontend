import React from "react";

const State = (props) => {
    return (
        <React.Fragment>
            <div className={"event-state my-3 px-2 state-" + props.current}>
                {props.current.toUpperCase()}
            </div>
        </React.Fragment>
    );
};

export default State;
