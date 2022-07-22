import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { EventFormContext } from "contexts/EventFormContext";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_ROOMS } from "queries/room";
import { ADMIN_BOOK_ROOM } from "mutations/room";

import { Grid, Box, TextField, Typography, Select, InputLabel, MenuItem } from "@mui/material";

const RoomForm = ({ form_id }) => {
    const { activeEvent, setOpen } = useContext(EventFormContext);

    const { control, handleSubmit } = useForm();

    const [ rooms, setRooms ] = useState([]);

    const { loading } = useQuery(ADMIN_GET_ROOMS, {
        variables: { eventId: activeEvent?.id },
        onCompleted: (data) => {
            setRooms(data?.adminGetRooms);
        },
    });

    const [ bookRoom ] = useMutation(ADMIN_BOOK_ROOM, {
        refetchQueries: [
            ADMIN_GET_ROOMS,
        ],
        awaitRefetchQueries: true,
    });


    const [selectedRoom, setSelectedRoom] = useState("none");

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            room: selectedRoom,
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
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            {rooms?.map(({ room, available }) => (
                                <MenuItem value={room} disabled={!available}>
                                    {room}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    {selectedRoom !== "none" && (
                        <>
                            <Grid item xs={12}>
                                <Controller
                                    name="population"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={null}
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
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="equipment"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={""}
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
                                    defaultValue={""}
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
