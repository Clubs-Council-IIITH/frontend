import React from "react";
import { Button } from "reactstrap";

const EditButton = (props) => {
    return (
        <Button color="warning" onClick={props.onClick} className="edit-btn">
            <img src="/edit-18.svg" alt="E" className="edit-icon" />
        </Button>
    );
};

export default EditButton;
