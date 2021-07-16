import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const ResponseToast = ({
    controller: [toast, setToast],
    successText = "Done.",
    errorText = "An error occurred. Try again later.",
}) => {
    const handleClose = (_, reason) => {
        if (reason === "clickaway") return;
        setToast({ ...toast, open: false });
    };

    return (
        <Snackbar open={toast.open} autoHideDuration={5000} onClose={handleClose}>
            {toast.error ? (
                <Alert variant="outlined" severity="error">
                    {errorText}
                </Alert>
            ) : (
                <Alert variant="outlined" severity="success">
                    {successText}
                </Alert>
            )}
        </Snackbar>
    );
};

export default ResponseToast;
