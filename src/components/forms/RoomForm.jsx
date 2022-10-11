import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { EventFormContext } from "contexts/EventFormContext";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_AVAILABLE_ROOMS, ADMIN_ROOM_BY_EVENT_ID } from "queries/room";
import { ADMIN_BOOK_ROOM } from "mutations/room";

import { Grid, Box, TextField, Typography, Select, InputLabel, MenuItem } from "@mui/material";

const RoomForm = ({ form_id }) => {
    const { activeEvent, setOpen } = useContext(EventFormContext);

    const { control, handleSubmit } = useForm();

    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});

    const { loading } = useQuery(ADMIN_AVAILABLE_ROOMS, {
        variables: { eventId: activeEvent?.id },
        onCompleted: (data) => {
            setRooms(data?.availableRooms || []);
        },
    });

    const { loading: roomsLoading } = useQuery(ADMIN_ROOM_BY_EVENT_ID, {
        variables: { eventId: activeEvent?.id },
        onCompleted: (data) => {
            setSelectedRoom(data?.room || {});
        },
    });

    const [bookRoom] = useMutation(ADMIN_BOOK_ROOM, {
        refetchQueries: [ADMIN_ROOM_BY_EVENT_ID],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            room: selectedRoom?.room,
            eventId: activeEvent?.id,
        };

        await bookRoom({ variables: { ...transformedData } });

        // close modal
        setOpen(false);
    };

    return (
        <form id={form_id} onSubmit={handleSubmit(onSubmit)}>
            {activeEvent?.mode === "ONLINE" ? (
                <Typography>Room booking is unavailable for online events.</Typography>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Required Room/Venue</InputLabel>
                        <Select
                            fullWidth
                            name="venue"
                            value={selectedRoom?.room}
                            onChange={(e) => setSelectedRoom({ ...selectedRoom, room: e.target.value })}
                        >
                            {rooms?.map(({ room, available }) => (
                                <MenuItem value={room} disabled={!available}>
                                    {room}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    {selectedRoom?.room !== "none" && (
                        <>
                            <Grid item xs={12}>
                                <Controller
                                    name="population"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={selectedRoom?.population || ""}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Expected Audience Population*"
                                            placeholder={100}
                                            variant="outlined"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Expected audience population can not be empty!",
                                        min: "1",
                                        max: "5000",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="equipment"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={selectedRoom?.equipment || ""}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="Equipment Required"
                                            placeholder="Microphones, Projector, etc."
                                            variant="outlined"
                                            rows={6}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="additional"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={selectedRoom?.additional || ""}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="Additional Requirements"
                                            placeholder="Access to venue required at least 1 hour before the event"
                                            variant="outlined"
                                            rows={6}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
        </form>
    );
};

export default RoomForm;
