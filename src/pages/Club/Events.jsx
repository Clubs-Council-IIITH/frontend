import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS } from "queries/events";
import EventModel from "models/EventModel";

import UserGroups from "constants/UserGroups";
import EventStates from "constants/EventStates";

import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Collapse,
} from "@mui/material";
import {
    AddOutlined as AddIcon,
    ChevronRight as CollapsedIcon,
    ExpandMore as ExpandedIcon,
} from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import EventFormModal from "components/modals/EventFormModal";
import EventDeleteModal from "components/modals/EventDeleteModal";
import EventViewModal from "components/modals/EventViewModal";
import { EventCard } from "components/cards";

const EventStateToggle = ({ stateName, expanded, callback }) => (
    <ListItem disableGutters sx={{ maxWidth: "fit-content" }}>
        <ListItemButton onClick={callback} sx={{ borderRadius: "8px" }}>
            <ListItemText primary={stateName} sx={{ marginRight: 1 }} />
            <ListItemIcon sx={{ minWidth: 0 }}>
                {expanded ? <ExpandedIcon /> : <CollapsedIcon />}
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
);

const Events = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch events
    const GET_EVENTS = manage ? ADMIN_GET_CLUB_EVENTS : GET_CLUB_EVENTS;
    const { data, loading } = useQuery(GET_EVENTS, { variables: { id: targetId } });
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const targetEvents = manage ? data?.adminClubEvents : data?.clubEvents;
        setEvents(targetEvents?.map((o) => new EventModel(o)));
    }, [data]);

    // create/edit event form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(null);

    // delete confirmation modal
    const [deleteProps, setDeleteProps] = useState({});
    const [deleteModal, setDeleteModal] = useState(null);

    // view modal
    const [viewProps, setViewProps] = useState({});
    const [viewModal, setViewModal] = useState(null);

    // event states to expand
    const [expandUpcoming, setExpandUpcoming] = useState(true);
    const [expandCompleted, setExpandCompleted] = useState(false);
    const [expandDeleted, setExpandDeleted] = useState(false);

    // open only one event state at a time
    const expandState = (setTargetState) => {
        setExpandUpcoming(false);
        setExpandCompleted(false);
        setExpandDeleted(false);
        setTargetState(true);
    };

    // open edit modal and autofill data of event with given `id`
    const triggerEdit = (id) => {
        const targetEvents = (manage ? data?.adminClubEvents : data?.clubEvents).map(
            (o) => new EventModel(o)
        );
        setFormProps({ event: targetEvents?.find((event) => event.id === id) });
        setFormModal(true);
    };

    // open delete modal
    const triggerDelete = (id) => {
        const targetEvents = (manage ? data?.adminClubEvents : data?.clubEvents).map(
            (o) => new EventModel(o)
        );
        setDeleteProps({ event: targetEvents?.find((event) => event.id === id) });
        setDeleteModal(true);
    };

    // open view modal
    const triggerView = (id) => {
        const targetEvents = (manage ? data?.adminClubEvents : data?.clubEvents).map(
            (o) => new EventModel(o)
        );
        setViewProps({ event: targetEvents?.find((event) => event.id === id) });
        setViewModal(true);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton
                    noPadding
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setFormProps({});
                        setFormModal(true);
                    }}
                >
                    <Box display="flex" mr={1}>
                        <AddIcon fontSize="small" />
                    </Box>
                    New Event
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);

    const cardProps = {
        manage,
        triggerEdit,
        triggerDelete,
        triggerView,
    };

    useEffect(() => console.log(events), [events]);

    return (
        <>
            <EventFormModal controller={[formModal, setFormModal]} {...formProps} />
            <EventDeleteModal controller={[deleteModal, setDeleteModal]} {...deleteProps} />
            <EventViewModal controller={[viewModal, setViewModal]} {...viewProps} />
            <Page full loading={loading} empty={!events?.length}>
                <Box p={3}>
                    <List>
                        {/* upcoming events */}
                        <EventStateToggle
                            stateName="UPCOMING"
                            expanded={expandUpcoming}
                            callback={() => expandState(setExpandUpcoming)}
                        />
                        <Collapse in={expandUpcoming}>
                            <Grid container spacing={2} mb={2}>
                                {events
                                    ?.filter(
                                        (e) =>
                                            e.state !== EventStates.completed &&
                                            e.state !== EventStates.deleted
                                    )
                                    ?.map((event, idx) => (
                                        <Grid item md={4} key={idx}>
                                            <EventCard actions {...event} {...cardProps} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Collapse>

                        {/* completed events */}
                        <EventStateToggle
                            stateName="COMPLETED"
                            expanded={expandCompleted}
                            callback={() => expandState(setExpandCompleted)}
                        />
                        <Collapse in={expandCompleted}>
                            <Grid container spacing={2}>
                                {events
                                    ?.filter((e) => e.state == EventStates.completed)
                                    ?.map((event, idx) => (
                                        <Grid item md={4} key={idx}>
                                            <EventCard {...event} {...cardProps} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Collapse>

                        {/* deleted events */}
                        <EventStateToggle
                            stateName="DELETED"
                            expanded={expandDeleted}
                            callback={() => expandState(setExpandDeleted)}
                        />
                        <Collapse in={expandDeleted}>
                            <Grid container spacing={2}>
                                {events
                                    ?.filter((e) => e.state == EventStates.deleted)
                                    ?.map((event, idx) => (
                                        <Grid item md={4} key={idx}>
                                            <EventCard {...event} {...cardProps} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Collapse>
                    </List>
                </Box>
            </Page>
        </>
    );
};

export default Events;
