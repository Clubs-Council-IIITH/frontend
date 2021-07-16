import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Button, Box, Typography } from "@material-ui/core";
import { Modal, ModalBody, ModalFooter } from "components/modals";

import { red } from "@material-ui/core/colors";

import ClubService from "services/ClubService";

import ResponseToast from "components/ResponseToast";

// styles {{{
const useStyles = makeStyles({
    deleteButton: {
        borderColor: red["A700"],
        color: red["A700"],
    },
});
// }}}

const ClubDeleteModal = ({ club = null, controller: [open, setOpen] }) => {
    const classes = useStyles();

    const [toast, setToast] = useState({ open: false });

    const onSubmit = async () => {
        if (club?.id) {
            // delete instance of club
            const { error } = await ClubService.deleteClub(club.id);

            // show response toast based on form submission status
            setToast({ open: true, error });
            setOpen(false);
        }
    };

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <ModalBody mini>
                    <Box>
                        <Typography variant="h5">
                            Are you sure you want to delete{" "}
                            <Box component="span" fontWeight={500}>
                                {club?.name}
                            </Box>
                            ?
                        </Typography>
                    </Box>
                </ModalBody>
                <ModalFooter rightAligned>
                    <Box mr={1}>
                        <Button
                            variant="text"
                            color="primary"
                            size="large"
                            onClick={() => setOpen(false)}
                        >
                            <Box px={2}>Cancel</Box>
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            type="submit"
                            variant="outlined"
                            size="large"
                            onClick={onSubmit}
                            className={classes.deleteButton}
                        >
                            <Box px={2}>Yes, delete it</Box>
                        </Button>
                    </Box>
                </ModalFooter>
            </Modal>
            <ResponseToast
                controller={[toast, setToast]}
                successText={`Club deleted successfully.`}
            />
        </>
    );
};

export default ClubDeleteModal;
