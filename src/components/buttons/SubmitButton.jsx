import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";

const SubmitButton = ({ errors, className, children }) => {
    const [isLoading, setIsLoading] = useState(false);
    console.log(errors);
    return (
        <Button
            color="primary"
            type="submit"
            onClick={() => setIsLoading(true)}
            className={className}
        >
            {isLoading && Object.keys(errors).length === 0 ? (
                <Spinner size="sm" color="light" className="mr-3" />
            ) : null}
            {children}
        </Button>
    );
};

export default SubmitButton;
