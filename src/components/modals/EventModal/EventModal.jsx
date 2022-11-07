import { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import {
    Grid,
    Typography,
    Divider,
    Button,
    Box,
    Card,
    CardMedia,
    CardActionArea,
    CardActions,
    Fade,
    Modal,
} from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { PROGRESS_EVENT, DELETE_EVENT, BYPASS_BUDGET } from "mutations/events";
import {
    ADMIN_GET_CLUB_EVENTS,
    GET_CLUB_EVENTS,
    ADMIN_GET_ALL_EVENTS,
    GET_ALL_EVENTS,
    GET_EVENT_BY_ID,
    ADMIN_CC_PENDING_EVENTS,
    ADMIN_SLC_PENDING_EVENTS,
    ADMIN_SLO_PENDING_EVENTS,
    ADMIN_GAD_PENDING_EVENTS,
    ADMIN_APPROVED_EVENTS,
} from "queries/events";
import { ADMIN_GET_EVENT_BUDGET } from "queries/finance";

import { TabBar, TabPanels } from "components/Tabs";
import { NavigationContext } from "contexts/NavigationContext";

import UserGroups from "constants/UserGroups";
import { SessionContext } from "contexts/SessionContext";

import Details from "./Details";
import Budget from "./Budget";
import Venue from "./Venue";
import Discussion from "./Discussion";

import EventStates from "constants/EventStates";
import ResponseToast from "components/ResponseToast";

const EVENT_POSTER_PLACEHOLDER =
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const EventModal = ({ manage, eventId = null, actions = [], controller: [open, setOpen] }) => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);
    const { session } = useContext(SessionContext);

    const MODAL_HEIGHT = isTabletOrMobile ? "50vh" : "60vh";
    const MODAL_WIDTH = isTabletOrMobile ? "95vw" : "80vw";
    const POSTER_MAXHEIGHT = "75vh";
    const POSTER_MAXWIDTH = "75vw";

    // tab list and controller
    const tabs = [
        { title: "Details", panel: <Details /> },
        { title: "Budget", panel: <Budget /> },
        { title: "Venue", panel: <Venue /> },
    ];
    const tabController = useState(0);

    useEffect(() => {
        if (open) tabController[1](0);
    }, [open]);

    // response toast
    const [toast, setToast] = useState({ open: false });

    // modal states
    const [activeEventId, setActiveEventId] = useState(eventId);
    const [editing, setEditing] = useState(!eventId);
    const [deleting, setDeleting] = useState(false);
    const [currentPoster, setCurrentPoster] = useState("");
    const [expandPoster, setExpandPoster] = useState(false);

    // fetch event details
    const [getEventData, { data: eventData, loading: eventLoading }] = useLazyQuery(
        GET_EVENT_BY_ID,
        {
            pollInterval: 1000 * 60 * 2, // 2 minutes
            variables: { id: activeEventId },
        }
    );

    const { data: budgetData, loading: budgetLoading } = useQuery(ADMIN_GET_EVENT_BUDGET, {
        pollInterval: 1000 * 60 * 3, // 3 minutes
        variables: { eventId: activeEventId },
    });

    // delete event
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        refetchQueries: [
            GET_ALL_EVENTS,
            ADMIN_GET_ALL_EVENTS,
            GET_CLUB_EVENTS,
            ADMIN_GET_CLUB_EVENTS,
            ADMIN_CC_PENDING_EVENTS,
            ADMIN_SLC_PENDING_EVENTS,
            ADMIN_SLO_PENDING_EVENTS,
            ADMIN_GAD_PENDING_EVENTS,
        ],
        awaitRefetchQueries: true,
        onError: (error) => setToast({ open: true, error: error }),
        onCompleted: () => setToast({ open: true, successText: "Event deleted successfully!" }),
    });

    // approve and progress event
    const [approveEvent] = useMutation(PROGRESS_EVENT, {
        refetchQueries: [
            ADMIN_CC_PENDING_EVENTS,
            GET_ALL_EVENTS,
            ADMIN_GET_ALL_EVENTS,
            GET_CLUB_EVENTS,
            ADMIN_APPROVED_EVENTS,
            ADMIN_GET_CLUB_EVENTS,
            ADMIN_CC_PENDING_EVENTS,
            ADMIN_SLC_PENDING_EVENTS,
            ADMIN_SLO_PENDING_EVENTS,
            ADMIN_GAD_PENDING_EVENTS,
        ],
        awaitRefetchQueries: true,
        onError: (error) => setToast({ open: true, errorText: error }),
        onCompleted: () => setToast({ open: true, successText: "Done!" }),
    });

    // approve event budget
    const [approveEventBudget] = useMutation(BYPASS_BUDGET, {
        refetchQueries: [
            ADMIN_CC_PENDING_EVENTS,
            GET_ALL_EVENTS,
            ADMIN_GET_ALL_EVENTS,
            GET_CLUB_EVENTS,
            ADMIN_APPROVED_EVENTS,
            ADMIN_GET_CLUB_EVENTS,
            ADMIN_CC_PENDING_EVENTS,
            ADMIN_SLC_PENDING_EVENTS,
            ADMIN_SLO_PENDING_EVENTS,
            ADMIN_GAD_PENDING_EVENTS,
        ],
        awaitRefetchQueries: true,
        onError: (error) => setToast({ open: true, errorText: error }),
    });

    // update all states whenever eventId changes
    useEffect(() => {
        if (open) {
            setActiveEventId(eventId);
            setEditing(!eventId);
            setDeleting(false);
            setExpandPoster(false);
        }
    }, [eventId, open]);

    // update poster whenever eventData changes
    useEffect(() => {
        if (open) {
            setCurrentPoster(eventData?.event?.poster || "");
        }
    }, [eventData, open]);

    // fetch new event details whenever active event id changes
    useEffect(() => {
        if (open) {
            getEventData();
            return undefined; // this effect does not require a cleanup
        }
    }, [open, activeEventId]);

    // pass down props to each tab
    const tabProps = {
        activeEventId,
        setActiveEventId,
        eventData,
        eventLoading,
        editing,
        setEditing,
        deleting,
        setDeleting,
        currentPoster,
        setCurrentPoster,
    };

    // action handlers
    const handleCancel = () => {
        if (!activeEventId) setOpen(false);
        else if (editing) setEditing(false);
        else if (deleting) setDeleting(false);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleDelete = () => {
        setDeleting(true);
    };

    const handleDeleteConfirm = async () => {
        // delete instance of event
        await deleteEvent({ variables: { id: activeEventId } });

        // close modal
        setOpen(false);
    };

    const handleApprove = async () => {
        // approve current event
        await approveEvent({ variables: { id: activeEventId } });

        // close modal
        setOpen(false);
    };

    const handleApproveBudget = async () => {
        // approve current event budget
        await approveEventBudget({ variables: { id: activeEventId } });
    };

    // map action keys to buttons
    const actionButtons = {
        close: (
            <Button key="cancel" variant="outlined" onClick={() => setOpen(false)}>
                Close
            </Button>
        ),
        cancel: (
            <Button key="cancel" variant="outlined" onClick={handleCancel}>
                Cancel
            </Button>
        ),
        save: (
            <Button
                key="save"
                type="submit"
                form="ActiveEventForm"
                variant="contained"
                color="info"
                disableElevation
            >
                Save
            </Button>
        ),
        edit: (
            <Button
                disableElevation
                key="edit"
                variant="contained"
                color="warning"
                onClick={handleEdit}
            >
                Edit
            </Button>
        ),
        delete: (
            <Button
                disableElevation
                key="delete"
                variant="contained"
                color="error"
                onClick={handleDelete}
            >
                Delete
            </Button>
        ),
        deleteConfirm: (
            <Button
                key="save"
                variant="contained"
                color="error"
                disableElevation
                onClick={handleDeleteConfirm}
            >
                Yes, Delete it
            </Button>
        ),
        approve: (
            <Button
                disableElevation
                key="approve"
                variant="contained"
                color="success"
                onClick={handleApprove}
            >
                Approve
            </Button>
        ),
        submit:
            eventData?.event?.state === EventStates.incomplete ? (
                <Button
                    disableElevation
                    key="approve"
                    variant="contained"
                    color="success"
                    onClick={handleApprove}
                >
                    Submit
                </Button>
            ) : null,
        approveBudget: (
            // TO DO : add budgetApproved variable in fetching of data from backend
            (budgetLoading ||
                (!eventData?.event?.budgetApproved &&
                    budgetData?.adminEventBudget?.length !== 0))
                ? (
                    <Button
                        disableElevation
                        key="bypass"
                        variant="contained"
                        color="info"
                        onClick={handleApproveBudget}
                    >
                        Approve Budget
                    </Button>
                ) : null
        ),
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropProps={{ timeout: 500 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isTabletOrMobile ? "flex-start" : "center",
                    alignItems: "center",
                    outline: "none",
                    overflowY: isTabletOrMobile ? "auto" : "none",
                    my: 2,
                    py: 6,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            backgroundColor: "none",
                            borderRadius: theme.borderRadius,
                            outline: "none",
                            width: MODAL_WIDTH,
                        }}
                    >
                        <Fade in={expandPoster} unmountOnExit>
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                height="100vh"
                                width="100vw"
                                zIndex={999}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    width="100%"
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            maxHeight: POSTER_MAXHEIGHT,
                                            maxWidth: POSTER_MAXWIDTH,
                                            borderRadius: 2,
                                        }}
                                        src={
                                            eventLoading
                                                ? EVENT_POSTER_PLACEHOLDER
                                                : currentPoster || EVENT_POSTER_PLACEHOLDER
                                        }
                                    />
                                    <Button
                                        disableElevation
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setExpandPoster(false)}
                                        sx={{ mt: 2 }}
                                    >
                                        <BackIcon fontSize="small" sx={{ mr: 1 }} />
                                        Back to event
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                        <Fade in={!expandPoster} unmountOnExit>
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={
                                        manage &&
                                            activeEventId &&
                                            eventData?.event?.state !== EventStates.deleted &&
                                            !isTabletOrMobile
                                            ? 8
                                            : 12
                                    }
                                >
                                    <Card variant="none">
                                        <Box
                                            component={editing ? "div" : CardActionArea}
                                            onClick={editing ? null : () => setExpandPoster(true)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height={isTabletOrMobile ? 180 : 140}
                                                image={
                                                    eventLoading
                                                        ? EVENT_POSTER_PLACEHOLDER
                                                        : currentPoster || EVENT_POSTER_PLACEHOLDER
                                                }
                                            />
                                        </Box>

                                        <Box
                                            height={MODAL_HEIGHT}
                                            maxHeight={MODAL_HEIGHT}
                                            sx={{ overflowY: "auto" }}
                                        >
                                            {deleting ? (
                                                <Box display="flex" p={5}>
                                                    <Typography variant="h5">
                                                        Are you sure you want to delete{" "}
                                                        <Box component="span" fontWeight={500}>
                                                            {eventData?.event?.name}
                                                        </Box>
                                                        ?
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box>
                                                    {manage && activeEventId ? (
                                                        <>
                                                            <TabBar
                                                                tabs={tabs}
                                                                controller={tabController}
                                                                tabProps={tabProps}
                                                            />
                                                            <Divider />
                                                        </>
                                                    ) : null}

                                                    <TabPanels
                                                        tabs={tabs}
                                                        controller={tabController}
                                                        tabProps={tabProps}
                                                    />
                                                </Box>
                                            )}
                                        </Box>

                                        <>
                                            <Divider />
                                            <Box
                                                p={1}
                                                display="flex"
                                                justifyContent="space-between"
                                            >
                                                {actionButtons["close"]}
                                                {(editing || deleting || actions.length) &&
                                                    eventData?.event?.state !== EventStates.deleted ? (
                                                    <CardActions sx={{ p: 0, m: 0 }}>
                                                        {!activeEventId || editing ? (
                                                            <>{actionButtons["save"]}</>
                                                        ) : deleting ? (
                                                            <>
                                                                {actionButtons["cancel"]}
                                                                {actionButtons["deleteConfirm"]}
                                                            </>
                                                        ) : (
                                                            actions.map(
                                                                (action) => actionButtons[action]
                                                            )
                                                        )}
                                                    </CardActions>
                                                ) : null}
                                            </Box>
                                        </>
                                    </Card>
                                </Grid>

                                {manage &&
                                    activeEventId &&
                                    eventData?.event?.state !== EventStates.deleted ? (
                                    <Grid item xs>
                                        <Box height="100%">
                                            <Card variant="outlined" sx={{ height: "100%" }}>
                                                <Discussion
                                                    activeEventId={activeEventId}
                                                    open={open}
                                                />
                                            </Card>
                                        </Box>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Fade>
                    </Box>
                </Fade>
            </Modal>
            <ResponseToast controller={[toast, setToast]} />
        </>
    );
};

export default EventModal;
