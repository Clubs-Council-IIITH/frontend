import { useState, useEffect, cloneElement } from "react";

import { Button, Box, Divider, Stepper, Step, StepLabel, Typography } from "@mui/material";

import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

import EventFormContextProvider from "contexts/EventFormContext";

import EventForm from "components/forms/EventForm";
import FinanceForm from "components/forms/FinanceForm";

const EventFormModal = ({ event = null, controller: [open, setOpen] }) => {
    const formSteps = [
        {
            title: "Event Details",
            form_id: "EventForm",
            panel: <EventForm event={event} />,
        },
        {
            title: "Financial Requirements",
            form_id: "FinanceForm",
            panel: <FinanceForm event={event} />,
            optional: true,
        },
        {
            title: "Room Booking",
            form_id: "RoomForm",
            panel: <EventForm event={event} />,
            optional: true,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [toast, setToast] = useState({ open: false });

    // // show response toast based on form submission status
    // setToast({ open: true, error: createError || updateError });
    // setOpen(false);

    // reset step when modal is reopened
    useEffect(() => setActiveStep(0), [open]);

    return (
        <EventFormContextProvider
            stepperMethods={{
                next: handleNext,
                back: handleBack,
            }}
        >
            <Modal controller={[open, setOpen]}>
                <Box pt={4} pb={1}>
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                        {formSteps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={step.title} {...stepProps}>
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
                                    : activeStep === 0
                                    ? "Save & Continue"
                                    : "Next"}
                            </PrimaryActionButton>
                        </Box>
                    </Box>
                </ModalFooter>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Event ${event ? "edited" : "created"} successfully.`}
            />
        </EventFormContextProvider>
    );
};

export default EventFormModal;
