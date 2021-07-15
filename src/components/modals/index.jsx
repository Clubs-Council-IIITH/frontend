import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Modal as MuiModal, Backdrop, Fade, IconButton, Box, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// styles {{{
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        outline: "none",
    },
    body: {
        overflowY: "auto",
        maxHeight: "60vh",
        maxWidth: "75vw",
    },
    full: {
        height: "60vh",
        width: "75vw",
    },
    half: {
        width: "40vw",
    },
}));
// }}}

export const Modal = ({ controller: [open, setOpen], children }) => {
    const classes = useStyles();

    // load modal closed
    useEffect(() => setOpen(false), []);

    return (
        <MuiModal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <div className={classes.paper}>{children}</div>
            </Fade>
        </MuiModal>
    );
};

export const ModalHeader = ({ controller: [_, setOpen], title, actions }) => {
    return (
        <Box px={2} p={3} display="flex" alignItems="center">
            <IconButton onClick={() => setOpen(false)}>
                <Close />
            </IconButton>
            <Box mx={1} display="flex" justifyContent="space-between" width="100%">
                <Typography variant="h5">{title}</Typography>
                <Box>{actions}</Box>
            </Box>
        </Box>
    );
};

export const ModalBody = ({ full, half, children }) => {
    const classes = useStyles();

    return (
        <Box p={3} className={`${classes.body} ${full && classes.full} ${half && classes.half}`}>
            {children}
        </Box>
    );
};

export const ModalFooter = ({ rightAligned, children }) => {
    return (
        <Box p={3} display="flex" justifyContent={rightAligned ? "flex-end" : "flex-start"}>
            {children}
        </Box>
    );
};
