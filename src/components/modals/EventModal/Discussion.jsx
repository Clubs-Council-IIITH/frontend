import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_CC_PENDING_EVENTS, ADMIN_GET_EVENT_FEEDBACK } from "queries/events";
import { PROGRESS_EVENT, ADD_EVENT_FEEDBACK } from "mutations/events";

import {
    Button,
    Grid,
    Box,
    Collapse,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRow,
    Typography,
    Paper,
    Card,
} from "@mui/material";

import { ISOtoDT } from "utils/DateTimeUtil";

import Empty from "components/Empty";

const Discussion = ({ activeEventId, editing, setEditing }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();

    const { data: discussionData, loading: discussionLoading } = useQuery(
        ADMIN_GET_EVENT_FEEDBACK,
        { variables: { eventId: activeEventId } }
    );

    // send message
    const [sendMessage] = useMutation(ADD_EVENT_FEEDBACK, {
        refetchQueries: [ADMIN_GET_EVENT_FEEDBACK],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            eventId: activeEventId,
        };

        await sendMessage({ variables: transformedData });

        // reset input box
        reset({}, { keepDefaultValues: true });
    };

    return (
        <Box display="flex" flexDirection="column" overflow="hidden" height="300px" p={3}>
            <Box overflow="auto">
                {discussionData?.eventFeedbackThread?.length === 0 ? (
                    <Empty />
                ) : (
                    discussionData?.eventFeedbackThread?.map((discussion) => (
                        <Card variant="outlined" sx={{ mt: 1 }}>
                            <Box p={2}>
                                <Typography variant="subtitle2">
                                    {ISOtoDT(discussion?.timestamp).datetime}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {discussion?.user?.username} said:
                                </Typography>
                                <Typography variant="body">{discussion?.message}</Typography>
                            </Box>
                        </Card>
                    ))
                )}
            </Box>

            <Box>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyPress={async (e) => {
                        e.key === "Enter" && (await handleSubmit(onSubmit)());
                    }}
                >
                    <Box my={2} display="flex">
                        <Controller
                            name="message"
                            control={control}
                            shouldUnregister={true}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    fullWidth
                                    placeholder="Type a message..."
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    sx={{ mr: 2 }}
                                />
                            )}
                            rules={{ required: "Message can not be empty!" }}
                        />
                        <Button type="submit" variant="outlined">
                            Send
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Discussion;
