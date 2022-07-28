import { useContext, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_CC_PENDING_EVENTS, ADMIN_GET_EVENT_FEEDBACK } from "queries/events";
import { PROGRESS_EVENT, ADD_EVENT_FEEDBACK } from "mutations/events";

import { useTheme } from "@mui/styles";
import { Button, Box, TextField, Typography, Card, IconButton, Divider } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

import { ISOtoDT } from "utils/DateTimeUtil";

import { SessionContext } from "contexts/SessionContext";

import Empty from "components/Empty";

const DiscussionBubble = ({ user, datetime, message, outgoing = false, printDate = false }) => {
    const theme = useTheme();

    return (
        <>
            {printDate ? (
                <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="caption" gutterBottom>
                        {ISOtoDT(datetime).date}
                    </Typography>
                </Box>
            ) : null}
            <Card
                variant="none"
                sx={{
                    mb: 1,
                    p: 1.5,
                    backgroundColor: outgoing
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    color: outgoing
                        ? theme.palette.primary.contrastText
                        : theme.palette.secondary.contrastText,
                    borderRadius: theme.borderRadius,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={500}>
                        {user?.firstName}
                    </Typography>
                    <Typography variant="subtitle1" fontSize="0.8em">
                        {ISOtoDT(datetime).time}
                    </Typography>
                </Box>
                <Box mt={1}>
                    <Typography variant="body1">{message}</Typography>
                </Box>
            </Card>
        </>
    );
};

const DiscussionBox = ({ discussionData }) => {
    const { session } = useContext(SessionContext);

    // track end of discussion and scroll to it on load
    const endOfDiscussion = useRef(null);
    useEffect(
        () => endOfDiscussion?.current?.scrollIntoView(),
        [discussionData?.eventFeedbackThread]
    );

    return (
        <Box
            p={1}
            sx={{
                overflowY: "auto",
                height: "100px",
                flex: "1 1 auto",
            }}
        >
            {discussionData?.eventFeedbackThread?.map((discussion, idx) => (
                <DiscussionBubble
                    key={idx}
                    user={discussion?.user}
                    datetime={discussion?.timestamp}
                    message={discussion?.message}
                    outgoing={discussion?.user?.username == session?.username}
                    printDate={
                        idx == 0 ||
                        ISOtoDT(discussionData?.eventFeedbackThread[idx - 1]?.timestamp).date !==
                            ISOtoDT(discussion?.timestamp).date
                    }
                />
            ))}
            <Box ref={endOfDiscussion} />
        </Box>
    );
};

const Discussion = ({ activeEventId, open }) => {
    const { control, handleSubmit, reset } = useForm();

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
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Typography p={1} variant="button" fontSize="1em">
                DISCUSSION
            </Typography>
            {discussionData?.eventFeedbackThread?.length === 0 ? (
                <Empty />
            ) : (
                <>
                    <Divider />
                    <DiscussionBox discussionData={discussionData} />
                </>
            )}
            <Box p={1} display="flex" component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Controller
                        name="message"
                        control={control}
                        shouldUnregister={true}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Type a message..."
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        )}
                    />
                    <IconButton type="submit" sx={{ ml: 1 }}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Discussion;
