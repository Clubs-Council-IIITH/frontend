import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_AVAILABLE_ROOMS, ADMIN_ROOM_BY_EVENT_ID } from "queries/room";
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
} from "@mui/material";

import EventVenues from "constants/EventVenues";
import EventVenues_Public from "constants/EventVenues_Public";
import { SessionContext } from "contexts/SessionContext";

const Venue = ({ activeEventId, eventData, eventLoading, editing, setEditing, currentRoom, setCurrentRoom, }) => {
    const { control, handleSubmit } = useForm();
    const { session } = useContext(SessionContext);

    // editing = editing && ((eventData?.event?.state === "A_0" && session.group === "club") || (session.group === "clubs_council" || session.group === "slo"));

    const [selectedRoom, setSelectedRoom] = useState("none");

    const { data: rooms, loading: roomsLoading } = useQuery(ADMIN_AVAILABLE_ROOMS, {
        variables: { eventId: activeEventId },
    });

    const { data: currentBooking, loading: currentBookingLoading } = useQuery(
        ADMIN_ROOM_BY_EVENT_ID,
        {
            variables: { eventId: activeEventId },
            pollInterval: 1000 * 60 * 2, // 2 minutes
            onCompleted: (data) => {
                setSelectedRoom(data?.adminRoomByEventId?.room || "none");
                setCurrentRoom(data?.adminRoomByEventId?.room || "none");
            },
        }
    );

    const [bookRoom] = useMutation(ADMIN_BOOK_ROOM, {
        refetchQueries: [ADMIN_ROOM_BY_EVENT_ID],
        awaitRefetchQueries: true,
    });

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
                    <FormLabel component="legend">Requested Venue</FormLabel>
                    {(editing && eventData?.event?.state === "A_0" && session.group === "club") ? (
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
                                rooms?.adminAvailableRooms?.map(({ room, available }, idx) => (
                                    <MenuItem key={idx} value={room} disabled={!available}>
                                        {EventVenues[room]}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    ) : (editing && (session.group === "clubs_council" || session.group === "slo") && currentRoom !== "none") ? (
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
                                rooms?.adminAvailableRooms
                                    ?.filter(x => { return x.room !== "none" })
                                    ?.map(({ room, available }, idx) => (
                                        <MenuItem key={idx} value={room} disabled={!available}>
                                            {EventVenues[room]}
                                        </MenuItem>
                                    ))
                            )}
                        </Select>
                    ) : (
                        <Typography variant="h5" mt={1}>
                            {currentBookingLoading ? (
                                <Skeleton animation="wave" />
                            ) : currentBooking?.adminRoomByEventId?.room ? (
                                <Box display="flex" alignItems="center">
                                    <Box mr={1}>
                                        {EventVenues_Public[currentBooking?.adminRoomByEventId?.room] ||
                                            "None"}
                                    </Box>
                                </Box>
                            ) : (
                                "none"
                            )}
                        </Typography>
                    )}
                </Grid>

                {((editing &&
                    eventData?.event?.state === "A_0" &&
                    selectedRoom &&
                    selectedRoom !== "none") ||
                    (!editing &&
                        eventData?.event?.state === "A_0" &&
                        !currentBookingLoading &&
                        currentBooking?.adminRoomByEventId?.room &&
                        currentBooking?.adminRoomByEventId?.room !== "none")) && (
                        <Grid item container mt={0} spacing={3}>
                            {(editing && ((eventData?.event?.state === "A_0" && session.group === "club") || (session.group === "clubs_council" || session.group === "slo"))) ?
                                (
                                    <Grid item xs={12}>
                                        <Controller
                                            name="population"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={
                                                currentBooking?.adminRoomByEventId?.population || ""
                                            }
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
                                                    InputProps={{ inputProps: { min: 1 } }}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                            rules={{
                                                required: "Expected audience population can not be empty!",
                                            }}
                                        />
                                    </Grid>
                                ) : (
                                    // <>
                                    //     <FormLabel component="legend">Expected Population</FormLabel>
                                    //     <Typography variant="body1">
                                    //         {currentBookingLoading ? (
                                    //             <Skeleton animation="wave" />
                                    //         ) : currentBooking?.adminRoomByEventId?.population ? (
                                    //             currentBooking.adminRoomByEventId.population
                                    //         ) : (
                                    //             ""
                                    //         )}
                                    //     </Typography>
                                    // </>
                                    null
                                )
                            }


                            {(editing && ((eventData?.event?.state === "A_0" && session.group === "club") || (session.group === "clubs_council" || session.group === "slo"))) ?
                                (
                                    <Grid item xs={12}>

                                        <Controller
                                            name="equipment"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={
                                                currentBooking?.adminRoomByEventId?.equipment || ""
                                            }
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
                                    </Grid>
                                ) : (
                                    // <>
                                    //     <FormLabel component="legend">Equipment Required</FormLabel>
                                    //     <Typography variant="body1">
                                    //         {currentBookingLoading ? (
                                    //             <Skeleton animation="wave" />
                                    //         ) : currentBooking?.adminRoomByEventId?.equipment ? (
                                    //             currentBooking.adminRoomByEventId.equipment
                                    //         ) : (
                                    //             ""
                                    //         )}
                                    //     </Typography>
                                    // </>
                                    null
                                )
                            }

                            {(editing && ((eventData?.event?.state === "A_0" && session.group === "club") || (session.group === "clubs_council" || session.group === "slo"))) ?
                                (
                                    <Grid item xs={12}>

                                        <Controller
                                            name="additional"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={currentBooking?.adminRoomByEventId?.additional}
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
                                    </Grid>
                                ) : (
                                    // <>
                                    //     <FormLabel component="legend">
                                    //         Additional Requirements
                                    //     </FormLabel>
                                    //     <Typography variant="body1">
                                    //         {currentBookingLoading ? (
                                    //             <Skeleton animation="wave" />
                                    //         ) : currentBooking?.adminRoomByEventId?.additional ? (
                                    //             currentBooking.adminRoomByEventId.additional
                                    //         ) : (
                                    //             ""
                                    //         )}
                                    //     </Typography>
                                    // </>
                                    null
                                )}
                        </Grid>
                    )}

                {(!(editing && eventData?.event?.state === "A_0") &&
                    selectedRoom &&
                    selectedRoom !== "none") ?
                    (<Grid item container mt={0} spacing={3}>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Expected Population</FormLabel>
                            <Typography variant="body1">
                                {currentBookingLoading ? (
                                    <Skeleton animation="wave" />
                                ) : currentBooking?.adminRoomByEventId?.population ? (
                                    currentBooking.adminRoomByEventId.population
                                ) : (
                                    ""
                                )}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormLabel component="legend">Equipment Required</FormLabel>
                            <Typography variant="body1">
                                {currentBookingLoading ? (
                                    <Skeleton animation="wave" />
                                ) : currentBooking?.adminRoomByEventId?.equipment ? (
                                    currentBooking.adminRoomByEventId.equipment
                                ) : (
                                    "-"
                                )}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormLabel component="legend">
                                Additional Requirements
                            </FormLabel>
                            <Typography variant="body1">
                                {currentBookingLoading ? (
                                    <Skeleton animation="wave" />
                                ) : currentBooking?.adminRoomByEventId?.additional ? (
                                    currentBooking.adminRoomByEventId.additional
                                ) : (
                                    "-"
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                    ) : (
                        null
                    )
                }
            </Grid>
        </form >
    );
};

export default Venue;
