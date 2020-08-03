import React from "react";
import { Button } from "reactstrap";

const DeleteButton = (props) => {
    return (
        <Button color="danger" onClick={props.onClick} className="delete-btn mx-1">
            <img tag={Button} src="/delete-18.svg" alt="D" className="delete-icon" />
        </Button>
    );
};

export default DeleteButton;
