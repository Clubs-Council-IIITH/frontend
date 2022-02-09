import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "mutations/events";
import { ADMIN_GET_CLUB_EVENTS, GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";

import {
    Grid,
    Box,
    TextField,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "components/modals";

import { ISOtoHTML } from "utils/DateTimeUtil";
import { AudienceStringtoDict } from "utils/FormUtil";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

const EventFormModal = ({ event = null, controller: [open, setOpen] }) => {
    const { control, handleSubmit } = useForm();

    const [toast, setToast] = useState({ open: false });

    const [createEvent, { error: createError }] = useMutation(CREATE_EVENT, {
        refetchQueries: [GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
    });
    const [updateEvent, { error: updateError }] = useMutation(CREATE_EVENT, {
        refetchQueries: [{ query: GET_EVENT_BY_ID, variables: { id: event?.id } }],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            audience: Object.entries(data.audience)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        };

        // update or create new instance of data
        await (event
            ? updateEvent({ variables: { ...transformedData, id: event.id } })
            : createEvent({ variables: { ...transformedData } }));

        // show response toast based on form submission status
        setToast({ open: true, error: createError || updateError });
        setOpen(false);
    };

    useEffect(() => console.log(event), [event]);

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <ModalHeader controller={[open, setOpen]} title="Create a new event" />

                <ModalBody full>
                    <form id="EventForm" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Box mb={2}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={event?.name || ""}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                label="Name*"
                                                placeholder="The Greatest Event of All Time"
                                                variant="outlined"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                        )}
                                        rules={{ required: "Event name can not be empty!" }}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <Controller
                                                name="datetimeStart"
                                                control={control}
                                                shouldUnregister={true}
                                                defaultValue={ISOtoHTML(event?.datetimeStart)}
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Start*"
                                                        type="datetime-local"
                                                        placeholder=""
                                                        variant="outlined"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        InputLabelProps={{ shrink: true }}
                                                        helperText={error ? error.message : null}
                                                    />
                                                )}
                                                rules={{
                                                    required: "Event start time can not be empty!",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Controller
                                                name="datetimeEnd"
                                                control={control}
                                                shouldUnregister={true}
                                                defaultValue={ISOtoHTML(event?.datetimeEnd)}
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="End*"
                                                        type="datetime-local"
                                                        placeholder=""
                                                        variant="outlined"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        InputLabelProps={{ shrink: true }}
                                                        helperText={error ? error.message : null}
                                                    />
                                                )}
                                                rules={{
                                                    required: "Event end time can not be empty!",
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={2}>
                                    <Controller
                                        name="venue"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={event?.venue || ""}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                label="Venue (or meeting link)"
                                                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                variant="outlined"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Controller
                                        name="description"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={event?.description || ""}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                multiline
                                                fullWidth
                                                label="Description"
                                                placeholder="Some very long description about the event."
                                                variant="outlined"
                                                rows={6}
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                        )}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md>
                                <FormControl component="fieldset">
                                    <Box mx={1} my={1}>
                                        <FormLabel component="legend">Target Audience</FormLabel>
                                        <FormGroup>
                                            <Box mt={0.8} mb={1}>
                                                <Controller
                                                    name={"audience"}
                                                    control={control}
                                                    shouldUnregister={true}
                                                    defaultValue={AudienceStringtoDict(
                                                        event?.audience
                                                    )}
                                                    render={({ field }) =>
                                                        [
                                                            { value: "ug1", label: "UG1" },
                                                            { value: "ug2", label: "UG2" },
                                                            { value: "ug3", label: "UG3" },
                                                            { value: "ugx", label: "UG4+" },
                                                            { value: "pg", label: "PG" },
                                                            { value: "staff", label: "Staff" },
                                                            {
                                                                value: "faculty",
                                                                label: "Faculty",
                                                            },
                                                        ].map((audience, idx) => (
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        key={idx}
                                                                        color="primary"
                                                                        checked={
                                                                            field.value[
                                                                                audience.value
                                                                            ]
                                                                        }
                                                                        onChange={(e) =>
                                                                            field.onChange({
                                                                                ...field.value,
                                                                                [audience.value]:
                                                                                    e.target
                                                                                        .checked,
                                                                            })
                                                                        }
                                                                    />
                                                                }
                                                                label={audience.label}
                                                                {...field}
                                                            />
                                                        ))
                                                    }
                                                />
                                            </Box>
                                        </FormGroup>
                                    </Box>
                                </FormControl>
                                <Box mb={2}>
                                    <Controller
                                        name="financialRequirements"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={event?.financialRequirements || ""}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                multiline
                                                fullWidth
                                                label="Financial Requirements"
                                                placeholder="A boatload of money."
                                                variant="outlined"
                                                rows={8}
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <Controller
                                        name="lastEditedBy"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={event?.lastEditedBy || ""}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                label="Your name?*"
                                                placeholder="Firstname Lastname"
                                                variant="outlined"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                        )}
                                        rules={{ required: "Your name is required." }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </ModalBody>

                <ModalFooter rightAligned>
                    <Box mr={1}>
                        <SecondaryActionButton size="large" onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryActionButton>
                    </Box>
                    <Box>
                        <PrimaryActionButton
                            type="submit"
                            form="EventForm"
                            variant="outlined"
                            size="large"
                        >
                            Save
                        </PrimaryActionButton>
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
