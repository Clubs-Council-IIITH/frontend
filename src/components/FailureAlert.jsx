import React from "react";
import { Alert } from "reactstrap";

const FailureAlert = ({ error }) => {
    if (!error) return null;
    return (
        <Alert color="danger" className="failure-alert">
            {Object.keys(error).map((field) => (
                <div>{`${field}: ${error[field]}`}</div>
            ))}
        </Alert>
    );
};

export default FailureAlert;
