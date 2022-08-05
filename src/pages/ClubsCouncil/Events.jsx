import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_EVENT_BUDGET } from "queries/finance";
import { ADMIN_CC_PENDING_EVENTS, ADMIN_GET_EVENT_DISCUSSION } from "queries/events";
import { PROGRESS_EVENT, SEND_DISCUSSION_MESSAGE } from "mutations/events";

import Page from "components/Page";
import ResponseToast from "components/ResponseToast";

import {
    Button,
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

import {
    KeyboardArrowDown as ExpandIcon,
    KeyboardArrowUp as CollapseIcon,
} from "@mui/icons-material";

import { ISOtoDT } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";
import { CurrencyInput, CurrencyText } from "components/CurrencyFormat";

import Loading from "components/Loading";
import Empty from "components/Empty";

const FinanceItem = ({ item }) => {
    return (
        <TableRow>
            <TableCell sx={{ fontSize: "1em" }}>{item?.description}</TableCell>
            <TableCell align="right" sx={{ fontSize: "1em" }}>
                <CurrencyText value={item?.amount} />
            </TableCell>
        </TableRow>
    );
};

const EventItem = ({ item, toastController: [toast, setToast] }) => {
    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();

    // clear discussion message value on send
    useEffect(reset, [isSubmitSuccessful]);

    const { data: budgetData, loading: budgetLoading } = useQuery(ADMIN_GET_EVENT_BUDGET, {
        variables: { eventId: item?.id },
    });

    const { data: discussionData, loading: discussionLoading } = useQuery(
        ADMIN_GET_EVENT_DISCUSSION,
        {
            variables: { eventId: item?.id },
        }
    );

    // approve and progress event
    const [approveEvent] = useMutation(PROGRESS_EVENT, {
        refetchQueries: [ADMIN_CC_PENDING_EVENTS],
        awaitRefetchQueries: true,
        onError: (error) => setToast({ open: true, error: error }),
        onCompleted: () => setToast({ open: true }),
    });

    // send message
    const [addDiscussion] = useMutation(SEND_DISCUSSION_MESSAGE, {
        refetchQueries: [ADMIN_GET_EVENT_DISCUSSION],
        awaitRefetchQueries: true,
        onError: (error) => setToast({ open: true, error: error }),
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            eventId: item?.id,
        };

        await addDiscussion({ variables: transformedData });
    };

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <CollapseIcon /> : <ExpandIcon />}
                    </IconButton>
                </TableCell>
                <TableCell> {item?.name} </TableCell>
                <TableCell> {item?.club?.name} </TableCell>
                <TableCell>
                    {ISOtoDT(item?.datetimeStart).date}, {ISOtoDT(item?.datetimeStart).time}
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => approveEvent({ variables: { id: item?.id } })}
                    >
                        Approve
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box my={2}>
                            <Typography variant="subtitle2"> DESCRIPTION </Typography>
                            {item?.description}
                        </Box>

                        <Box my={2}>
                            <Typography variant="subtitle2"> DATE & TIME </Typography>
                            {`${ISOtoDT(item?.datetimeStart).datetime} — ${
                                ISOtoDT(item?.datetimeEnd).datetime
                            }`}
                        </Box>

                        <Box my={2}>
                            <Typography variant="subtitle2"> AUDIENCE </Typography>
                            {AudienceFormatter(item?.audience)}
                        </Box>

                        <Box my={2}>
                            <Typography variant="subtitle2"> MODE </Typography>
                            {item?.mode}
                        </Box>

                        <Divider />
                        <Box my={2}>
                            <Typography variant="subtitle2"> BUDGET </Typography>
                            {budgetData?.adminEventBudget?.length === 0 ? (
                                <Empty />
                            ) : (
                                <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Description </TableCell>
                                                <TableCell align="right"> Amount </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {budgetData?.adminEventBudget?.map((budget) => (
                                                <FinanceItem item={budget} />
                                            ))}

                                            <TableRow
                                                sx={{
                                                    "& > *": { borderBottom: "unset" },
                                                }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        fontSize: "1.1em",
                                                        fontWeight: 700,
                                                        borderBottom: "none",
                                                    }}
                                                >
                                                    TOTAL
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    sx={{
                                                        fontSize: "1.1em",
                                                        fontWeight: 700,
                                                        borderBottom: "none",
                                                    }}
                                                >
                                                    <CurrencyText
                                                        value={
                                                            parseFloat(
                                                                budgetData?.adminEventBudget
                                                                    ?.map(
                                                                        (budget) => budget?.amount
                                                                    )
                                                                    ?.reduce(
                                                                        (p, c) =>
                                                                            parseFloat(p) +
                                                                            parseFloat(c),
                                                                        0.0
                                                                    )
                                                            ) || 0
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>

                        {/* <Box my={2}> */}
                        {/* <Typography variant="subtitle2"> ROOM </Typography> */}
                        {/* </Box> */}

                        <Divider />
                        <Box my={2}>
                            <Typography variant="subtitle2"> DISCUSSION </Typography>
                            <Box>
                                {discussionData?.eventDiscussionThread?.length === 0 ? (
                                    <Empty />
                                ) : (
                                    discussionData?.eventDiscussionThread?.map((discussion) => (
                                        <Card variant="outlined" sx={{ mt: 1 }}>
                                            <Box p={2}>
                                                <Typography variant="subtitle2">
                                                    {ISOtoDT(discussion?.timestamp).datetime}
                                                </Typography>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    {discussion?.user?.username} said:
                                                </Typography>
                                                <Typography variant="body">
                                                    {discussion?.message}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    ))
                                )}
                            </Box>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box my={2} display="flex">
                                    <Controller
                                        name="message"
                                        control={control}
                                        shouldUnregister={true}
                                        defaultValue=""
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
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
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const Events = () => {
    const [toast, setToast] = useState({ open: false });

    const { data, loading } = useQuery(ADMIN_CC_PENDING_EVENTS);

    return (
        <Page
            header={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Pending approval
                </Box>
            }
            loading={loading}
            empty={!data?.adminCcPendingEvents?.length}
        >
            <TableContainer component={Paper} variant="outlined" sx={{ mx: 1, my: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell> Event </TableCell>
                            <TableCell> Club </TableCell>
                            <TableCell> Scheduled for </TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.adminCcPendingEvents?.map((item) => (
                            <EventItem item={item} toastController={[toast, setToast]} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ResponseToast controller={[toast, setToast]} successText={"Event approved."} />
        </Page>
    );
};

export default Events;
