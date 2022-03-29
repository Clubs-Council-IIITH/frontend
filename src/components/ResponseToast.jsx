import { Alert, Snackbar } from "@mui/material";

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
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={toast.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            {toast.error ? (
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {errorText}
                </Alert>
            ) : (
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    {successText}
                </Alert>
            )}
        </Snackbar>
    );
};

export default ResponseToast;
