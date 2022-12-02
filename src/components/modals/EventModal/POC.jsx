// import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_POC_BY_EVENT_ID } from "queries/poc";
import { ADMIN_GET_CLUB_EVENTS, GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";
import { ADMIN_ADD_POC } from "mutations/poc";

import {
    Grid,
    Skeleton,
    TextField,
    Typography,
    FormLabel,
} from "@mui/material";

const POC = ({ activeEventId, eventData, eventLoading, editing, setEditing }) => {
    const { control, handleSubmit } = useForm();

    const { data: currentPocDetails, loading: currentPocDetailsLoading } = useQuery(
        ADMIN_POC_BY_EVENT_ID,
        {
            variables: { eventId: activeEventId },
            pollInterval: 1000 * 60 * 5, // 5 minutes
        }
    );

    const [addPoc] = useMutation(ADMIN_ADD_POC, {
        refetchQueries: [ADMIN_POC_BY_EVENT_ID, GET_EVENT_BY_ID, GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            eventId: activeEventId,
        };

        // add poc
        await addPoc({ variables: { ...transformedData } });

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
                    <FormLabel component="legend">POC Details</FormLabel>
                </Grid>

                {((editing &&
                    eventData?.event?.state === "A_0")) && (
                        <Grid item container mt={0} spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name="pocName"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentPocDetails?.adminPocByEventId?.pocName}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            placeholder="Full Name (As per Institute's Records)"
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Name can not be empty!",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="pocRollno"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentPocDetails?.adminPocByEventId?.pocRollno}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Roll Number"
                                            type="number"
                                            placeholder="202*******"
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={
                                                error ? error.message : null
                                            }
                                        />
                                    )}
                                    rules={{
                                        required: "Roll number can not be empty!",
                                        min: "2000000000",
                                        max: "2050000000",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="pocMobile"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentPocDetails?.adminPocByEventId?.pocMobile}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Contact Number"
                                            type="number"
                                            placeholder="9876543210 (Don't add prefixes and spaces)"
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Contact Number can not be empty!",
                                        min: "5000000000",
                                        max: "9999999999",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="pocEmail"
                                    control={control}
                                    shouldUnregister={true}
                                    defaultValue={currentPocDetails?.adminPocByEventId?.pocEmail}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            placeholder="firstname.lastname@students.iiit.ac.in"
                                            variant="standard"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputLabelProps={{ shrink: true }}
                                            helperText={
                                                error ? error.message : null
                                            }
                                        />
                                    )}
                                    rules={{
                                        required: "Email can not be empty!",
                                    }}
                                />
                            </Grid>

                        </Grid>
                    )}

                {!(editing && eventData?.event?.state === "A_0") ?
                    (
                        <Grid item container mt={0} spacing={3}>
                            <Grid item xs={12}>
                                <FormLabel component="legend">Name</FormLabel>
                                <Typography variant="body1">
                                    {currentPocDetailsLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : currentPocDetails?.adminPocByEventId?.pocName ? (
                                        currentPocDetails.adminPocByEventId.pocName
                                    ) : (
                                        ""
                                    )}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormLabel component="legend">Roll Number</FormLabel>
                                <Typography variant="body1">
                                    {currentPocDetailsLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : currentPocDetails?.adminPocByEventId?.pocRollno ? (
                                        currentPocDetails.adminPocByEventId.pocRollno
                                    ) : (
                                        "-"
                                    )}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormLabel component="legend">Contact Number</FormLabel>
                                <Typography variant="body1">
                                    {currentPocDetailsLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : currentPocDetails?.adminPocByEventId?.pocMobile ? (
                                        currentPocDetails.adminPocByEventId.pocMobile
                                    ) : (
                                        "-"
                                    )}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormLabel component="legend">Email</FormLabel>
                                <Typography variant="body1">
                                    {currentPocDetailsLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : currentPocDetails?.adminPocByEventId?.pocEmail ? (
                                        currentPocDetails.adminPocByEventId.pocEmail
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

export default POC;
