import React from "react";
import { Alert } from "reactstrap";

const FailureAlert = ({ failed }) => {
    if (!failed) return null;
    return <Alert color="danger"> Something went wrong! Try again in a while. </Alert>;
};

export default FailureAlert;
