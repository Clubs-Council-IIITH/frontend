import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";

const SubmitButton = ({ APIerror, errors, className, children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Button
            color="primary"
            type="submit"
            onClick={() => setIsLoading(true)}
            className={"common-btn text-uppercase " + className}
        >
            {isLoading && Object.keys(errors).length === 0 && !APIerror ? (
                <Spinner size="sm" color="light" className="mr-3" />
            ) : null}
            {children}
        </Button>
    );
};

export default SubmitButton;
