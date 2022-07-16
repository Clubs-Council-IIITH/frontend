import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { EventFormContext } from "contexts/EventFormContext";
import EventRooms from "constants/EventRooms";

import { Grid, Box, TextField, Typography, Select, InputLabel, MenuItem } from "@mui/material";

const RoomForm = ({ form_id }) => {
    const { activeEvent, setOpen } = useContext(EventFormContext);

    const { control, handleSubmit } = useForm();

    // TODO: populate with API call
    const roomList = [
        { room: "none", available: true },
        { room: "himalaya_101", available: true },
        { room: "himalaya_102", available: true },
        { room: "himalaya_103", available: false },
        { room: "himalaya_104", available: true },
        { room: "himalaya_105", available: false },
        { room: "vindhya_sh1", available: true },
        { room: "vindhya_sh2", available: true },
        { room: "amphitheatre", available: true },
    ];

    const [selectedRoom, setSelectedRoom] = useState("none");

    const onSubmit = async (data) => {
        console.log(selectedRoom);
        console.log(data);

        // TODO: API calls

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
                            {roomList.map(({ room, available }) => (
                                <MenuItem value={room} disabled={!available}>
                                    {EventRooms[room]}
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
