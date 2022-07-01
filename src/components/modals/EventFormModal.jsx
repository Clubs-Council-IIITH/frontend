import { useState, useEffect, cloneElement } from "react";

import { Button, Box, Divider, Stepper, Step, StepLabel, Typography } from "@mui/material";

import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

import EventFormContextProvider from "contexts/EventFormContext";

import EventForm from "components/forms/EventForm";
import FinanceForm from "components/forms/FinanceForm";

const formSteps = [
    {
        title: "Event Details",
        form_id: "EventForm",
        panel: <EventForm />,
    },
    {
        title: "Financial Requirements",
        form_id: "FinanceForm",
        panel: <FinanceForm />,
        optional: true,
    },
    {
        title: "Room Booking",
        form_id: "RoomForm",
        panel: <EventForm />,
        optional: true,
    },
];

const EventFormModal = ({ event = null, controller: [open, setOpen] }) => {
    // stepper controls
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // reset step when modal is reopened
    useEffect(() => setActiveStep(0), [open]);

    return (
        <EventFormContextProvider
            open={open}
            event={event}
            stepperMethods={{
                next: handleNext,
                back: handleBack,
            }}
        >
            <Modal controller={[open, setOpen]}>
                <Box p={4}>
                    <Stepper activeStep={activeStep}>
                        {formSteps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps}>{step.title}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>

                <ModalBody full>
                    {cloneElement(formSteps[activeStep].panel, {
                        form_id: formSteps[activeStep].form_id,
                    })}
                </ModalBody>

                <ModalFooter>
                    <Box display="flex" width="100%" justifyContent="space-between">
                        <Box>
                            <SecondaryActionButton
                                noPadding
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Close
                            </SecondaryActionButton>
                        </Box>

                        <Box>
                            <SecondaryActionButton
                                noPadding
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </SecondaryActionButton>
                            <PrimaryActionButton
                                type="submit"
                                form={formSteps[activeStep].form_id}
                                noPadding
                            >
                                {activeStep === formSteps.length - 1
                                    ? "Finish"
                                    : activeStep === 0 && !event
                                    ? "Save & Continue"
                                    : "Next"}
                            </PrimaryActionButton>
                        </Box>
                    </Box>
                </ModalFooter>
            </Modal>
        </EventFormContextProvider>
    );
};

export default EventFormModal;
