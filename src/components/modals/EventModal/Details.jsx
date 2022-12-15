import { useContext, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { CREATE_EVENT, CHANGE_POSTER, UPDATE_EVENT, UPDATE_AUDIENCE } from "mutations/events";
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
    Stack,
} from "@mui/material";
import {
    EventOutlined as DatetimeIcon,
    GroupOutlined as AudienceIcon,
    Wallpaper as PosterIcon,
    DeleteOutline as TrashIcon,
    LocationOnOutlined,
} from "@mui/icons-material";

import { ISOtoDT, ISOtoHTML } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";
import { CheckboxesStringtoDict } from "utils/FormUtil";
import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";
import EventVenues_Public from "constants/EventVenues_Public";

import enLocale from "date-fns/locale/en-IN";

const Details = ({
    activeEventId,
    setActiveEventId,
    eventData,
    eventLoading,
    editing,
    setEditing,
    setCurrentPoster,
    currentRoom,
    setCurrentRoom,
    currentBookingLoading,
}) => {
    const { watch, control, handleSubmit } = useForm();
    const { isTabletOrMobile } = useContext(NavigationContext);
    const { session } = useContext(SessionContext);

    const watchdatetimeStart = watch("datetimeStart", (new Date()));

    const limit = 500;
    const [descriptionContent, setDescriptionContent] = useState((eventData?.event?.description || "").slice(0, limit));
    const [descriptionActive, setdescriptionActive] = useState(false);
    const [descriptionLengthColor, setdescriptionLengthColor] = useState("primary");

    const setFormattedContent = useCallback(
        text => {
            setDescriptionContent(text.slice(0, limit + 2));
            if (text.length >= limit - 9)
                setdescriptionLengthColor("red");
            else
                setdescriptionLengthColor("primary");
        },
        [limit, setDescriptionContent]
    );

    const [createEvent] = useMutation(CREATE_EVENT, {
        refetchQueries: [GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
        onCompleted: ({ newEventDescription: { event } }) => {
            setActiveEventId(event.id);
        },
    });

    const [updateEvent] = useMutation(UPDATE_EVENT, {
        refetchQueries: [GET_EVENT_BY_ID, GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
    });

    const [updateAudience] = useMutation(UPDATE_AUDIENCE, {
        refetchQueries: [GET_EVENT_BY_ID],
        awaitRefetchQueries: true,
    });

    // send the new poster
    const [changePoster] = useMutation(CHANGE_POSTER, {
        refetchQueries: [GET_EVENT_BY_ID, GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
    });

    // submit form
    const onSubmit = async (data) => {
        if (activeEventId) {
            setEditing(false);
        }

        // remove rawPoster from the data and format audience
        const transformedData = {
            ...data,
            rawPoster: null,
            description: descriptionContent,
            audience: Object.entries(checked)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        };

        // update or create new instance of data
        await (activeEventId ?
            ((eventData?.event?.state === "A_0") ? (
                updateEvent({
                    variables: { ...transformedData, id: activeEventId },
                    onCompleted: async () => {
                        await changePoster({
                            variables: { ...data?.rawPoster, eventId: activeEventId },
                        });
                    },
                }))
                : (
                    updateAudience({
                        variables: { ...transformedData, id: activeEventId },
                        onCompleted: async () => {
                            await changePoster({
                                variables: { ...data?.rawPoster, eventId: activeEventId },
                            });
                        },
                    })
                )
            )
            : createEvent({
                variables: { ...transformedData },
                onCompleted: async ({ newEventDescription: { event } }) => {
                    await changePoster({ variables: { ...data?.rawPoster, eventId: event.id } });
                },
            }));

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
        { value: "faculty", label: "Faculty" },
        { value: "internal", label: "Internal/Non-Public" },
    ];

    const [checked, setChecked] = useState(CheckboxesStringtoDict(
        eventData?.event?.audience ||
        audienceSelect.map((o) => o.value).join(",")
    ));

    const checkChecked = (value, field) => {
        if (value === "internal" && checked["internal"] === false) {
            var Map = {};

            for (var i in checked) {
                field.value[i] = false;
                Map[i] = false;
            }

            field.value["internal"] = true;
            Map["internal"] = true;

            setChecked(Map);
        }
        else if (value === "internal") {
            var Map = {};

            for (var i in checked) {
                field.value[i] = true;
                Map[i] = true;
            }

            field.value["internal"] = false;
            Map["internal"] = false;
            setChecked(Map);
        }
        else {
            var Map = {};
            let count = 0;

            for (var i in checked) {
                if (i === "internal")
                    Map[i] = false;
                else if (i === value) {
                    Map[i] = !checked[value];
                    count = count + Map[i];
                }
                else {
                    Map[i] = checked[i];
                    count = count + Map[i];
                }
            }

            if (!count) {
                field.value["internal"] = true;
                Map["internal"] = true;
            }
            else
                field.value["internal"] = false;

            setChecked(Map);
        }

        field.value = checked;
    };

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
                            {!(editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
                                <DatetimeIcon fontSize="small" sx={{ mr: 2 }} />
                            ) : null}

                            <Grid container alignItems="center">
                                <Grid item mb={editing && (!activeEventId || eventData?.event?.state === "A_0") ? 2 : 0}>
                                    <Typography variant="subtitle1">
                                        {eventLoading ? (
                                            <Skeleton animation="wave" width={100} />
                                        ) : (editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
                                            <Controller
                                                name="datetimeStart"
                                                control={control}
                                                shouldUnregister={true}
                                                defaultValue={ISOtoHTML(
                                                    eventData?.event?.datetimeStart || new Date()
                                                )}
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDateFns}
                                                        adapterLocale={enLocale}
                                                    >
                                                        <DateTimePicker
                                                            label="From*"
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={error}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    helperText={
                                                                        error ? error.message : null
                                                                    }
                                                                    variant="standard"
                                                                />
                                                            )}
                                                            value={value}
                                                            onChange={onChange}
                                                            minDateTime={new Date()}
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
                                </Grid>

                                {!(isTabletOrMobile && (editing && (!activeEventId || eventData?.event?.state === "A_0"))) ? (
                                    <Grid item>
                                        <Box mx={1}>—</Box>
                                    </Grid>
                                ) : (
                                    <Box m={1} />
                                )}

                                <Grid item mb={(editing && (!activeEventId || eventData?.event?.state === "A_0")) ? 2 : 0}>
                                    <Typography variant="subtitle1">
                                        {eventLoading ? (
                                            <Skeleton animation="wave" width={100} />
                                        ) : (editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
                                            <Controller
                                                name="datetimeEnd"
                                                control={control}
                                                shouldUnregister={true}
                                                defaultValue={ISOtoHTML(
                                                    eventData?.event?.datetimeEnd
                                                )}
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDateFns}
                                                        adapterLocale={enLocale}
                                                    >
                                                        <DateTimePicker
                                                            label="To*"
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={error}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    helperText={
                                                                        error ? error.message : null
                                                                    }
                                                                    variant="standard"
                                                                />
                                                            )}
                                                            value={value}
                                                            onChange={onChange}
                                                            minDateTime={watchdatetimeStart}
                                                        />
                                                    </LocalizationProvider>
                                                )}
                                                rules={{
                                                    required: "Event end time can not be empty!",
                                                    min: watchdatetimeStart,
                                                }}
                                            />
                                        ) : (
                                            ISOtoDT(eventData?.event?.datetimeEnd).datetime
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        {(editing && session.group === "club") ? ( // && eventData?.event?.state === "A_0" ? (
                            <Box display="flex">
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Controller
                                            name="rawPoster"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={{
                                                img: null,
                                                deletePrev: (editing && (!activeEventId || eventData?.event?.state === "A_0")),
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <Button variant="outlined" component="label">
                                                        <PosterIcon
                                                            fontSize="small"
                                                            sx={{ mr: 1 }}
                                                        />
                                                        Update Poster
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
                                                            onClick={(_) => {
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
                        ) : (editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
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
                                        inputProps={{
                                            style: { fontSize: isTabletOrMobile ? 25 : 35 },
                                        }}
                                        sx={{ width: isTabletOrMobile ? "100%" : "50%" }}
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
                        ) : (editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
                            <>
                                <Controller
                                    name="description"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={descriptionContent}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            type="text"
                                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                            variant="standard"
                                            multiline
                                            rows={3}
                                            value={descriptionContent}
                                            onChange={(e) => { setFormattedContent(e.target.value); }}
                                            onFocus={(e) => { setdescriptionActive(true); }}
                                            onBlur={(e) => { setdescriptionActive(false); }}
                                            error={error}
                                            inputProps={{ maxLength: limit }}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                            sx={{ mt: 1 }}
                                        />
                                    )}
                                />
                                {descriptionActive ?
                                    <Stack direction="row" justifyContent="end">
                                        <Box sx={{ color: descriptionLengthColor }}>
                                            {descriptionContent.length}
                                        </Box>
                                        <Box>
                                            {"/" + limit}
                                        </Box>
                                    </Stack>
                                    : null}
                            </>
                        ) : (
                            <div style={{ whiteSpace: "pre-line" }}>
                                {eventData?.event?.description || "-"}
                            </div>
                        )}
                    </Typography>
                </Grid>

                {eventLoading || currentBookingLoading ? (
                    <Grid item xs={12} mt={2}>
                        <Typography variant="body1">
                            <Skeleton animation="wave" />
                        </Typography>
                    </Grid>
                ) : ((editing && (!activeEventId || eventData?.event?.state === "A_0"))) ||
                    !activeEventId ||
                    !currentRoom ||
                    currentRoom === "none" ||
                    currentRoom === "other" ? null : (
                    <Grid item xs={12} mt={2}>
                        <Typography variant="body1">
                            <Box mr={1} display="flex" alignItems="center">
                                <LocationOnOutlined fontSize="small" sx={{ mr: 2 }} />
                                {EventVenues_Public[currentRoom] || ""}
                            </Box>
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    {(editing && (!activeEventId || eventData?.event?.state === "A_0")) ? (
                        <FormLabel component="legend" sx={{ fontSize: 12 }}>
                            Target Audience
                        </FormLabel>
                    ) : null}

                    <Box display="flex" alignItems="flex-start">
                        <AudienceIcon sx={{ my: 0.5, mr: 2 }} />
                        {eventLoading ? (
                            <Skeleton animation="wave" width={200} />
                        ) : (editing && session.group === "club") ? (
                            <FormControl component="fieldset" sx={{ ml: 1 }}>
                                <FormGroup>
                                    <Box>
                                        <Controller
                                            name="audience"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={checked}
                                            render={({ field }) =>
                                                audienceSelect.map((audience, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        control={
                                                            <Checkbox
                                                                key={idx}
                                                                color="primary"
                                                                checked={
                                                                    checked[audience.value]
                                                                }
                                                                onChange={(e) => {
                                                                    field.onChange({
                                                                        ...field.value,
                                                                        [audience.value]:
                                                                            e.target.checked,
                                                                    });
                                                                    checkChecked(audience.value, field);
                                                                }
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
                            <Grid container spacing={1}>
                                {AudienceFormatter(eventData?.event?.audience)
                                    .split(",")
                                    .map((audience, key) => (
                                        <Grid item>
                                            <Chip key={key} label={audience} />
                                        </Grid>
                                    ))}
                            </Grid>
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
