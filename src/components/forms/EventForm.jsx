import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { CREATE_EVENT, UPDATE_EVENT } from "mutations/events";
import { ADMIN_GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";

import {
    Grid,
    Box,
    TextField,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
} from "@mui/material";

import { ISOtoHTML } from "utils/DateTimeUtil";
import { AudienceStringtoDict } from "utils/FormUtil";

import EventModel from "models/EventModel";
import { EventFormContext } from "contexts/EventFormContext";

const EventForm = ({ form_id }) => {
    const { stepper, activeEvent, setActiveEvent } = useContext(EventFormContext);
    const { control, handleSubmit } = useForm();

    const [createEvent, { error: createError }] = useMutation(CREATE_EVENT, {
        refetchQueries: [ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
        onCompleted: ({ createEvent: { event } }) => setActiveEvent(new EventModel(event)),
    });

    const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT, {
        refetchQueries: [
            { query: GET_EVENT_BY_ID, variables: { id: activeEvent?.id } },
            ADMIN_GET_CLUB_EVENTS,
        ],
        awaitRefetchQueries: true,
        onCompleted: ({ updateEvent: { event } }) => setActiveEvent(new EventModel(event)),
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
        await (activeEvent
            ? updateEvent({ variables: { ...transformedData, id: activeEvent.id } })
            : createEvent({ variables: { ...transformedData } }));

        // move to the next page
        stepper.next();
    };

    return (
        <form id={form_id} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Box mb={2}>
                        <Controller
                            name="name"
                            control={control}
                            shouldUnregister={true}
                            defaultValue={activeEvent?.name || ""}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                                    defaultValue={ISOtoHTML(activeEvent?.datetimeStart)}
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
                                    defaultValue={ISOtoHTML(activeEvent?.datetimeEnd)}
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

                    <Box mx={1} mt={2}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Target Audience</FormLabel>
                            <FormGroup>
                                <Box mt={0.8} mb={1}>
                                    <Controller
                                        name={"audience"}
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue={AudienceStringtoDict(
                                            activeEvent?.audience || ""
                                        )}
                                        render={({ field }) =>
                                            [
                                                { value: "ug1", label: "UG1" },
                                                { value: "ug2", label: "UG2" },
                                                { value: "ug3", label: "UG3" },
                                                { value: "ugx", label: "UG4+" },
                                                { value: "pg", label: "PG" },
                                                { value: "staff", label: "Staff" },
                                                { value: "faculty", label: "Faculty" },
                                            ].map((audience, idx) => (
                                                <FormControlLabel
                                                    key={idx}
                                                    control={
                                                        <Checkbox
                                                            key={idx}
                                                            color="primary"
                                                            checked={field.value[audience.value]}
                                                            onChange={(e) =>
                                                                field.onChange({
                                                                    ...field.value,
                                                                    [audience.value]:
                                                                        e.target.checked,
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
                        </FormControl>
                    </Box>

                    <Box mx={1}>
                        <FormLabel component="legend">Mode</FormLabel>
                        <FormGroup>
                            <Box mt={0.8} mb={1}>
                                <Controller
                                    name={"mode"}
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={activeEvent?.mode?.toLowerCase() || "offline"}
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                value={value}
                                                onChange={onChange}
                                                name="mode-radio"
                                            >
                                                <FormControlLabel
                                                    sx={{ display: "flex" }}
                                                    value="offline"
                                                    control={<Radio />}
                                                    label="Offline"
                                                />
                                                <FormControlLabel
                                                    sx={{ display: "flex" }}
                                                    value="online"
                                                    control={<Radio />}
                                                    label="Online"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />
                            </Box>
                        </FormGroup>
                    </Box>
                </Grid>

                <Grid item md>
                    <Box mb={2}>
                        <Controller
                            name="description"
                            control={control}
                            shouldUnregister={true}
                            defaultValue={activeEvent?.description || ""}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    multiline
                                    fullWidth
                                    label="Description"
                                    placeholder="Some very long description about the event."
                                    variant="outlined"
                                    rows={10}
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default EventForm;
