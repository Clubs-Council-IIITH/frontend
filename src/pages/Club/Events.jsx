import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS } from "queries/events";

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

import Page from "components/Page";
import EventModal from "components/modals/EventModal";
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
    const targetEvents = manage ? "adminClubEvents" : "clubEvents";

    // fetch events
    const GET_EVENTS = manage ? ADMIN_GET_CLUB_EVENTS : GET_CLUB_EVENTS;
    const { data: eventsData, loading: eventsLoading } = useQuery(GET_EVENTS, {
        variables: { id: targetId },
    });

    // event modal
    const [viewProps, setViewProps] = useState({});
    const [viewModal, setViewModal] = useState(false);

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

    // open view modal
    const triggerView = (id) => {
        setViewProps({
            manage: manage,
            eventId: id,
            actions: manage ? ["edit", "delete"] : [],
        });
        setViewModal(true);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        if (manage) {
            setActions([
                {
                    title: "New Event",
                    icon: AddIcon,
                    onClick: () => {
                        setViewProps({
                            manage: manage,
                            eventId: null,
                            actions: ["edit", "delete"],
                        });
                        setViewModal(true);
                    },
                },
            ]);
        }
    }, [manage]);

    const cardProps = {
        manage,
        triggerView,
    };

    return (
        <>
            <EventModal controller={[viewModal, setViewModal]} {...viewProps} />
            <Page full empty={!eventsLoading && !eventsData?.[targetEvents]?.length}>
                <Box px={2}>
                    <List>
                        {/* upcoming events */}
                        <EventStateToggle
                            stateName="UPCOMING"
                            expanded={expandUpcoming}
                            callback={() => expandState(setExpandUpcoming)}
                        />
                        <Collapse in={expandUpcoming}>
                            <Grid container spacing={2} mb={2}>
                                {eventsLoading
                                    ? [...Array(6).keys()].map((idx) => (
                                          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                              <EventCard skeleton />
                                          </Grid>
                                      ))
                                    : eventsData?.[targetEvents]
                                          ?.filter(
                                              (e) =>
                                                  e.state !== EventStates.completed &&
                                                  e.state !== EventStates.deleted
                                          )
                                          ?.map((event, idx) => (
                                              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
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
                                {eventsData?.[targetEvents]
                                    ?.filter((e) => e.state == EventStates.completed)
                                    ?.map((event, idx) => (
                                        <Grid item md={4} lg={3} key={idx}>
                                            <EventCard {...event} {...cardProps} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Collapse>

                        {/* deleted events */}
                        {manage && (
                            <>
                                <EventStateToggle
                                    stateName="DELETED"
                                    expanded={expandDeleted}
                                    callback={() => expandState(setExpandDeleted)}
                                />
                                <Collapse in={expandDeleted}>
                                    <Grid container spacing={2}>
                                        {eventsData?.[targetEvents]
                                            ?.filter((e) => e.state == EventStates.deleted)
                                            ?.map((event, idx) => (
                                                <Grid item md={4} lg={3} key={idx}>
                                                    <EventCard {...event} {...cardProps} />
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Collapse>
                            </>
                        )}
                    </List>
                </Box>
            </Page>
        </>
    );
};

export default Events;
