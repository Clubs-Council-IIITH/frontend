import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_ROOMS } from "queries/room";
import { ADMIN_BOOK_ROOM } from "mutations/room";

import {
    Grid,
    Box,
    Skeleton,
    TextField,
    Typography,
    Select,
    FormLabel,
    MenuItem,
    Tooltip,
} from "@mui/material";

import { Done as ApprovedIcon, Autorenew as PendingIcon } from "@mui/icons-material";

import EventRooms from "constants/EventRooms";

const Venue = ({ activeEventId, eventData, eventLoading, editing, setEditing }) => {
    const { control, handleSubmit } = useForm();

    const { data: roomsData, loading: roomsLoading } = useQuery(ADMIN_GET_ROOMS, {
        variables: { eventId: activeEventId },
    });

    const [bookRoom] = useMutation(ADMIN_BOOK_ROOM, {
        refetchQueries: [ADMIN_GET_ROOMS],
        awaitRefetchQueries: true,
    });

    // currently selected room
    const [selectedRoom, setSelectedRoom] = useState("none");

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            room: selectedRoom,
            eventId: activeEventId,
        };

        // add room request
        await bookRoom({ variables: { ...transformedData } });

        // stop editing
        setEditing(false);
    };

    // TODO: replace with API Call
    const currentBookingLoading = false;
    const currentBooking = {
        venue: "Vindhya_sh1",
        population: 300,
        equipment: "Microphones and Projector",
        additional: "Access to venue required at least 1 hour before the event",
        approved: true,
    };
    useEffect(() => setSelectedRoom(currentBooking.venue), []); // mutation onComplete hook

    return (
        <form
            id="ActiveEventForm"
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            <Grid container p={3}>
                <Grid item xs={12}>
                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                        Requested Venue
                    </FormLabel>
                    {editing ? (
                        <Select
                            fullWidth
                            name="venue"
                            variant="standard"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            {roomsLoading ? (
                                <>
                                    <MenuItem>
                                        <Skeleton animation="wave" />
                                    </MenuItem>
                                    <MenuItem>
                                        <Skeleton animation="wave" />
                                    </MenuItem>
                                </>
                            ) : (
                                roomsData?.adminGetRooms?.map(({ room, available }, idx) => (
                                    <MenuItem key={idx} value={room} disabled={!available}>
                                        {EventRooms[room]}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    ) : (
                        <Typography variant="h5" mt={1}>
                            {currentBookingLoading ? (
                                <Skeleton animation="wave" />
                            ) : currentBooking ? (
                                <Box display="flex" alignItems="center">
                                    <Box mr={1}>{EventRooms[currentBooking.venue]}</Box>
                                    {currentBooking.approved ? (
                                        <Tooltip arrow title="Approved">
                                            <ApprovedIcon fontSize="small" color="success" />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip arrow title="Pending Approval">
                                            <PendingIcon fontSize="small" color="warning" />
                                        </Tooltip>
                                    )}
                                </Box>
                            ) : (
                                "None"
                            )}
                        </Typography>
                    )}
                </Grid>

                {selectedRoom !== "none" && (
                    <Grid item container mt={0} spacing={3}>
                        <Grid item xs={12}>
                            {editing ? (
                                <Controller
                                    name="population"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentBooking?.population}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Expected Audience Population*"
                                            placeholder={100}
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Expected audience population can not be empty!",
                                    }}
                                />
                            ) : (
                                <>
                                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                                        Expected Population
                                    </FormLabel>
                                    <Typography variant="body1">
                                        {currentBookingLoading ? (
                                            <Skeleton animation="wave" />
                                        ) : currentBooking ? (
                                            currentBooking.population
                                        ) : null}
                                    </Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            {editing ? (
                                <Controller
                                    name="equipment"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentBooking?.equipment}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="Equipment Required"
                                            placeholder="Microphones, Projector, etc."
                                            variant="standard"
                                            rows={4}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            ) : (
                                <>
                                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                                        Equipment Required
                                    </FormLabel>
                                    <Typography variant="body1">
                                        {currentBookingLoading ? (
                                            <Skeleton animation="wave" />
                                        ) : currentBooking ? (
                                            currentBooking.equipment
                                        ) : null}
                                    </Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            {editing ? (
                                <Controller
                                    name="additional"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentBooking?.additional}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="Additional Requirements"
                                            placeholder="Access to venue required at least 1 hour before the event"
                                            variant="standard"
                                            rows={4}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            ) : (
                                <>
                                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                                        Additional Requirements
                                    </FormLabel>
                                    <Typography variant="body1">
                                        {currentBookingLoading ? (
                                            <Skeleton animation="wave" />
                                        ) : currentBooking ? (
                                            currentBooking.additional
                                        ) : null}
                                    </Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default Venue;
