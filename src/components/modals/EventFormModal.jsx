import { useState, useEffect } from "react";

import { Box, Divider } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import { Modal, ModalBody, ModalFooter } from "components/modals";
import { TabBar, TabPanels } from "components/Tabs";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

import EventForm from "components/forms/EventForm";

const EventFormModal = ({ event = null, controller: [open, setOpen] }) => {
    const formTabs = [
        { title: "Event details", panel: <EventForm event={event} /> },
        { title: "Financial Requirements", panel: <EventForm event={event} /> },
        { title: "Room Booking", panel: <EventForm event={event} />, disabled: true },
    ];
    const tabController = useState(0);

    const [toast, setToast] = useState({ open: false });

    // // show response toast based on form submission status
    // setToast({ open: true, error: createError || updateError });
    // setOpen(false);

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <Box px={3} py={2}>
                    <TabBar tabs={formTabs} controller={tabController} />
                    <Divider />
                </Box>

                <ModalBody full>
                    <TabPanels tabs={formTabs} controller={tabController} />
                </ModalBody>

                <ModalFooter rightAligned>
                    <Box mr={1}>
                        <SecondaryActionButton size="large" onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryActionButton>
                    </Box>
                    <Box>
                        {tabController === formTabs.length - 1 ? (
                            <PrimaryActionButton
                                type="submit"
                                form="EventForm"
                                variant="outlined"
                                size="large"
                            >
                                Save
                            </PrimaryActionButton>
                        ) : (
                            <PrimaryActionButton type="submit" form="EventForm" size="large">
                                <Box display="flex" alignItems="center">
                                    Next
                                    <NavigateNext />
                                </Box>
                            </PrimaryActionButton>
                        )}
                    </Box>
                </ModalFooter>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Event ${event ? "edited" : "created"} successfully.`}
            />
        </>
    );
};

export default EventFormModal;
