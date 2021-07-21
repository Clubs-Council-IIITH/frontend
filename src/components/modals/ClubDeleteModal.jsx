import { useState } from "react";

import ClubService from "services/ClubService";

import { Box, Typography } from "@material-ui/core";
import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { DeleteButton, SecondaryActionButton } from "components/buttons";

const ClubDeleteModal = ({ club = null, mutate, controller: [open, setOpen] }) => {
    const [toast, setToast] = useState({ open: false });

    const onSubmit = async () => {
        if (club?.id) {
            // delete instance of club
            const { error } = await ClubService.deleteClub(club.id);

            // revalidate local data
            mutate();

            // show response toast based on form submission status
            setToast({ open: true, error });
            setOpen(false);
        }
    };

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <ModalBody mini>
                    <Box p={1}>
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
                        <SecondaryActionButton size="large" onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryActionButton>
                    </Box>
                    <Box>
                        <DeleteButton variant="outlined" size="large" onClick={onSubmit}>
                            Yes, delete it
                        </DeleteButton>
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
