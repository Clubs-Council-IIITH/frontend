import React from "react";
import { Button } from "reactstrap";

const NewButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            className="new-btn btn-outline-dark py-2 px-3 mx-md-5 my-auto"
        >
            <span className="d-md-none"> + </span>
            <span className="d-none d-md-block text-uppercase"> + NEW {props.text} </span>
        </Button>
    );
};

export default NewButton;
