import { useState } from "react";

// import EventService from "services/EventService";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "mutations/events";
import {
    ADMIN_GET_CLUB_EVENTS,
    GET_CLUB_EVENTS,
    ADMIN_GET_ALL_EVENTS,
    GET_ALL_EVENTS,
} from "queries/events";

import { Box, Typography } from "@material-ui/core";
import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { DeleteButton, SecondaryActionButton } from "components/buttons";

const EventDeleteModal = ({ event = null, controller: [open, setOpen] }) => {
    const [toast, setToast] = useState({ open: false });

    const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT, {
        refetchQueries: [
            GET_ALL_EVENTS,
            ADMIN_GET_ALL_EVENTS,
            GET_CLUB_EVENTS,
            ADMIN_GET_CLUB_EVENTS,
        ],
        awaitRefetchQueries: true,
    });

    const onSubmit = async () => {
        if (event?.id) {
            // delete instance of event
            await deleteEvent({ variables: { id: event.id } });

            // show response toast based on form submission status
            setToast({ open: true, deleteError });
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
