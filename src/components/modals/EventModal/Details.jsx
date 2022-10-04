import { useEffect, useContext } from "react";
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
    InputLabel,
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
import { NavigationContext } from "contexts/NavigationContext";

import enLocale from "date-fns/locale/en-IN";
import { useState } from "react";

// text editor
import RichTextEditor from "components/RichTextEditor";

const Details = ({
    activeEventId,
    setActiveEventId,
    eventData,
    eventLoading,
    editing,
    setEditing,
    setCurrentPoster,
    editorValue,
    setEditorValue,
}) => {
    const { control, handleSubmit } = useForm();
    const { isTabletOrMobile } = useContext(NavigationContext);

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
            description: JSON.stringify(editorValue),
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
                            {!editing ? <DatetimeIcon fontSize="small" sx={{ mr: 2 }} /> : null}

                            <Grid container>
                                <Grid item xs={12} md={5.5} mb={isTabletOrMobile ? 2 : 0}>
                                    <Typography variant="subtitle1">
                                        {eventLoading ? (
                                            <Skeleton animation="wave" width={100} />
                                        ) : editing ? (
                                            <Controller
                                                name="datetimeStart"
                                                control={control}
                                                shouldUnregister={true}
                                                defaultValue={ISOtoHTML(
                                                    eventData?.event?.datetimeStart
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

                                {!isTabletOrMobile ? (
                                    <Grid item>
                                        <Box mx={1}>—</Box>
                                    </Grid>
                                ) : null}

                                <Grid item xs={12} md={5.5}>
                                    <Typography variant="subtitle1">
                                        {eventLoading ? (
                                            <Skeleton animation="wave" width={100} />
                                        ) : editing ? (
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
                                </Grid>
                            </Grid>
                        </Box>

                        {editing ? (
                            <Box display="flex">
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
                    {editing ? (
                        <FormLabel component="legend" sx={{ fontSize: 12, mb: 1 }}>
                            Description
                        </FormLabel>
                    ) : null}
                    <Typography variant="body1">
                        {eventLoading ? (
                            <Skeleton animation="wave" />
                        ) : (
                            <RichTextEditor
                                editing={editing}
                                editorState={[editorValue, setEditorValue]}
                            />
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                    {editing ? (
                        <FormLabel component="legend" sx={{ fontSize: 12 }}>
                            Target Audience
                        </FormLabel>
                    ) : null}

                    <Box display="flex" alignItems="flex-start">
                        <AudienceIcon sx={{ my: 0.5, mr: 2 }} />
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
