import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT, UPDATE_EVENT, CHANGE_POSTER } from "mutations/events";
import { ADMIN_GET_CLUB_EVENTS, GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    Skeleton,
    Chip,
    Box,
    Grid,
    Button,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import {
    EventOutlined as DatetimeIcon,
    GroupOutlined as AudienceIcon,
    Wallpaper as PosterIcon,
    DeleteOutline as TrashIcon,
} from "@mui/icons-material";

import { ISOtoDT, ISOtoHTML } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";
import { AudienceStringtoDict } from "utils/FormUtil";

import enLocale from "date-fns/locale/en-IN";

const Details = ({
    activeEventId,
    setActiveEventId,
    eventData,
    eventLoading,
    editing,
    setEditing,
    setCurrentPoster,
}) => {
    const { control, handleSubmit } = useForm();

    const [createEvent] = useMutation(CREATE_EVENT, {
        refetchQueries: [GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
        onCompleted: ({ createEvent: { event } }) => {
            setActiveEventId(event.id);
        },
    });

    const [updateEvent] = useMutation(UPDATE_EVENT, {
        refetchQueries: [GET_EVENT_BY_ID, GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
    });

    // send the new poster
    const [changePoster] = useMutation(CHANGE_POSTER, {
        refetchQueries: [GET_EVENT_BY_ID],
        awaitRefetchQueries: true,
    });

    // submit form
    const onSubmit = async (data) => {
        // remove rawPoster from the data and format audience
        const transformedData = {
            ...data,
            rawPoster: null,
            audience: Object.entries(data.audience)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        };

        // update or create new instance of data
        let returnedEvent = await (activeEventId
            ? updateEvent({ variables: { ...transformedData, id: activeEventId } })
            : createEvent({ variables: { ...transformedData } }));

        let id = activeEventId || returnedEvent.data.createEvent.event.id;

        // add the poster
        await changePoster({ variables: { ...data?.rawPoster, eventId: id } });

        // stop editing
        setEditing(false);
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

    //datetime

    return (
        <form
            id="ActiveEventForm"
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            <Grid container p={3} spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            {!editing ? <DatetimeIcon fontSize="small" sx={{ mr: 1 }} /> : null}

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
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                                adapterLocale={enLocale}
                                            >
                                                <DateTimePicker
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            error={error}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                error ? error.message : null
                                                            }
                                                            label="From*"
                                                            type="datetime-local"
                                                            placeholder=""
                                                            variant="standard"
                                                        />
                                                    )}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            </LocalizationProvider>
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
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                                adapterLocale={enLocale}
                                            >
                                                <DateTimePicker
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            error={error}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                error ? error.message : null
                                                            }
                                                            label="To*"
                                                            type="datetime-local"
                                                            placeholder=""
                                                            variant="standard"
                                                        />
                                                    )}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            </LocalizationProvider>
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

                        {editing ? (
                            <Box display="flex" alignItems="center">
                                <PosterIcon sx={{ mr: 1 }} />
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Controller
                                            name="rawPoster"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={{ img: null, deletePrev: false }}
                                            render={({ field }) => (
                                                <>
                                                    <Button variant="outlined" component="label">
                                                        Upload Poster
                                                        <input
                                                            name="poster"
                                                            type="file"
                                                            accept="image/png, image/jpeg, image/jpg"
                                                            onChange={(e) => {
                                                                field.onChange({
                                                                    img: e?.target?.files[0],
                                                                    deletePrev: true,
                                                                });
                                                                setCurrentPoster(
                                                                    URL.createObjectURL(
                                                                        e?.target?.files[0]
                                                                    )
                                                                );
                                                            }}
                                                            hidden
                                                        />
                                                    </Button>
                                                    {field?.value?.img !== null ||
                                                    (!field?.value?.deletePrev &&
                                                        !!eventData?.event?.poster) ? (
                                                        <Button
                                                            variant="text"
                                                            component="label"
                                                            onClick={(e) => {
                                                                field.onChange({
                                                                    img: null,
                                                                    deletePrev: true,
                                                                });
                                                                setCurrentPoster(null);
                                                            }}
                                                        >
                                                            <TrashIcon />
                                                        </Button>
                                                    ) : null}
                                                </>
                                            )}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Box>
                        ) : null}
                    </Box>
                </Grid>

                <Grid item xs={12} mt={0}>
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
                                        rows={3}
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
                        ) : eventData?.event?.audience !== "none" ? (
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
            </Grid>
        </form>
    );
};

export default Details;
