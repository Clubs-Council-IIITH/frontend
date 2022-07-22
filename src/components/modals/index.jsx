import { useEffect } from "react";
import { useTheme } from "@mui/styles";

import { Modal as MuiModal, Fade, IconButton, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

export const Modal = ({ controller: [open, setOpen], children }) => {
    const theme = useTheme();

    // load modal closed
    useEffect(() => setOpen(false), []);

    return (
        <MuiModal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropProps={{ timeout: 500 }}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.borderRadius,
                        outline: "none",
                    }}
                >
                    {children}
                </Box>
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

export const ModalBody = ({ full, mini, children }) => {
    return (
        <Box
            sx={{
                // default modal body
                overflowY: "auto",
                maxHeight: "60vh",
                maxWidth: "75vw",

                // full modal
                ...(full && {
                    width: "75vw",
                    height: "60vh",
                }),

                // mini modal
                ...(mini && {
                    width: "40vw",
                }),
            }}
        >
            {children}
        </Box>
    );
};

export const ModalFooter = ({ rightAligned, children }) => {
    return (
        <Box p={2} display="flex" justifyContent={rightAligned ? "flex-end" : "flex-start"}>
            {children}
        </Box>
    );
};
