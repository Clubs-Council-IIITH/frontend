import { useState } from "react";

import EventService from "services/EventService";

import { Box, Typography } from "@material-ui/core";
import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { DeleteButton, SecondaryActionButton } from "components/buttons";

const EventDeleteModal = ({ event = null, mutate, controller: [open, setOpen] }) => {
    const [toast, setToast] = useState({ open: false });

    const onSubmit = async () => {
        if (event?.id) {
            // delete instance of event
            const { error } = await EventService.deleteEvent(event.id);

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
                                {event?.name}
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
                successText={`Event deleted successfully.`}
            />
        </>
    );
};

export default EventDeleteModal;
