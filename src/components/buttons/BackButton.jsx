import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const BackButton = () => {
    let history = useHistory();
    return (
        <Button color="secondary" className="back-btn mr-3 h-100" onClick={() => history.goBack()}>
            <img src="/back-18.svg" alt="&larr;" className="back-btn-icon" />
        </Button>
    );
};

export default BackButton;
