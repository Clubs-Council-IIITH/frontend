import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { CREATE_EVENT, UPDATE_EVENT } from "mutations/events";
import { ADMIN_GET_CLUB_EVENTS, GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";

import {
    Skeleton,
    Chip,
    Box,
    Grid,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { EventOutlined as DatetimeIcon, GroupOutlined as AudienceIcon } from "@mui/icons-material";

import { ISOtoDT, ISOtoHTML } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";
import { AudienceStringtoDict } from "utils/FormUtil";

const Details = ({
    activeEventId,
    setActiveEventId,
    eventData,
    eventLoading,
    editing,
    setEditing,
}) => {
    const { control, handleSubmit } = useForm();

    const [createEvent] = useMutation(CREATE_EVENT, {
        refetchQueries: [GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
        onCompleted: ({ createEvent: { event } }) => {
            setActiveEventId(event.id);
            setEditing(false);
        },
    });

    const [updateEvent] = useMutation(UPDATE_EVENT, {
        refetchQueries: [
            { query: GET_EVENT_BY_ID, variables: { id: activeEventId } },
            GET_CLUB_EVENTS,
            ADMIN_GET_CLUB_EVENTS,
        ],
        awaitRefetchQueries: true,
    });

    // submit form
    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            audience: Object.entries(data.audience)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        };

        // update or create new instance of data
        await (activeEventId
            ? updateEvent({ variables: { ...transformedData, id: activeEventId } })
            : createEvent({ variables: { ...transformedData } }));
    };

    const audienceSelect = [
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
    ];

    return (
        <form id="ActiveEventForm" onSubmit={handleSubmit(onSubmit)}>
            <Grid container p={3} spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <DatetimeIcon fontSize="small" sx={{ mr: 1 }} />

                        <Typography variant="subtitle1">
                            {eventLoading ? (
                                <Skeleton animation="wave" width={100} />
                            ) : editing ? (
                                <Controller
                                    name="datetimeStart"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={ISOtoHTML(eventData?.event?.datetimeStart)}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="From*"
                                            type="datetime-local"
                                            placeholder=""
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Event start time can not be empty!",
                                    }}
                                />
                            ) : (
                                ISOtoDT(eventData?.event?.datetimeStart).datetime
                            )}
                        </Typography>

                        <Box mx={1}>—</Box>

                        <Typography variant="subtitle1">
                            {eventLoading ? (
                                <Skeleton animation="wave" width={100} />
                            ) : editing ? (
                                <Controller
                                    name="datetimeEnd"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={ISOtoHTML(eventData?.event?.datetimeEnd)}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="To*"
                                            type="datetime-local"
                                            placeholder=""
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Event end time can not be empty!",
                                    }}
                                />
                            ) : (
                                ISOtoDT(eventData?.event?.datetimeEnd).datetime
                            )}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} mt={1}>
                    <Typography variant="h4">
                        {eventLoading ? (
                            <Skeleton animation="wave" />
                        ) : editing ? (
                            <Controller
                                name="name"
                                control={control}
                                shouldUnregister={true}
                                defaultValue={eventData?.event?.name || ""}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Name*"
                                        type="text"
                                        placeholder="The Greatest Event of All Time"
                                        variant="standard"
                                        autoComplete="off"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        InputLabelProps={{ shrink: true }}
                                        helperText={error ? error.message : null}
                                        inputProps={{ style: { fontSize: 35 } }}
                                        sx={{ width: "50%" }}
                                    />
                                )}
                                rules={{
                                    required: "Event name can not be empty!",
                                }}
                            />
                        ) : (
                            eventData?.event?.name || ""
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1">
                        {eventLoading ? (
                            <Skeleton animation="wave" />
                        ) : editing ? (
                            <Controller
                                name="description"
                                control={control}
                                shouldUnregister={true}
                                defaultValue={eventData?.event?.description || ""}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        type="text"
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        variant="standard"
                                        multiline
                                        rows={4}
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        InputLabelProps={{ shrink: true }}
                                        helperText={error ? error.message : null}
                                        sx={{ mt: 1 }}
                                    />
                                )}
                            />
                        ) : (
                            eventData?.event?.description || ""
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                    {editing ? (
                        <FormLabel component="legend" sx={{ fontSize: 12 }}>
                            Target Audience
                        </FormLabel>
                    ) : null}

                    <Box display="flex" alignItems="center">
                        <AudienceIcon sx={{ mr: 1 }} />
                        {eventLoading ? (
                            <Skeleton animation="wave" width={200} />
                        ) : editing ? (
                            <FormControl component="fieldset" sx={{ ml: 1 }}>
                                <FormGroup>
                                    <Box>
                                        <Controller
                                            name="audience"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={AudienceStringtoDict(
                                                eventData?.event?.audience ||
                                                    audienceSelect.map((o) => o.value).join(",")
                                            )}
                                            render={({ field }) =>
                                                audienceSelect.map((audience, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        control={
                                                            <Checkbox
                                                                key={idx}
                                                                color="primary"
                                                                checked={
                                                                    field.value[audience.value]
                                                                }
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
                        ) : eventData?.event?.audience ? (
                            AudienceFormatter(eventData?.event?.audience)
                                .split(",")
                                .map((audience, key) => (
                                    <Chip key={key} label={audience} sx={{ mx: 0.5 }} />
                                ))
                        ) : (
                            <Box mx={1}>—</Box>
                        )}
                    </Box>
                </Grid>

                {/* <Grid item xs={12}> */}
                {/*     venue */}
                {/* </Grid> */}
            </Grid>
        </form>
    );
};

export default Details;
