import React from "react";

const State = (props) => {
   return (
      <React.Fragment>
         <div className={"state-" + props.current}> {props.current.toUpperCase()} </div>
      </React.Fragment>
   );
};

export default State;
