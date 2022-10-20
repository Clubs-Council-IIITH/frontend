import { useState } from "react";
import { useTheme } from "@mui/styles";

import { useQuery } from "@apollo/client";
import { ADMIN_GAD_PENDING_EVENTS, ADMIN_APPROVED_EVENTS } from "queries/events";

import { Box, Grid, Typography } from "@mui/material";

import Page from "components/Page";

import EventStates from "constants/EventStates";
import EventModal from "components/modals/EventModal";
import { EventCard } from "components/cards";

const Events = () => {
    const theme = useTheme();

    const { data: pendingEventsData, loading: pendingEventsLoading } =
        useQuery(ADMIN_GAD_PENDING_EVENTS, {
            pollInterval: 1000 * 60 * 3, // 3 minutes
        });

    const { data: approvedEventsData, loading: approvedEventsLoading } =
        useQuery(ADMIN_APPROVED_EVENTS, {
            pollInterval: 1000 * 60 * 5, // 5 minutes
        });

    // event modal
    const [viewProps, setViewProps] = useState({});
    const [viewModal, setViewModal] = useState(false);

    // open view modal
    const triggerView = (id, actions) => {
        setViewProps({
            manage: true,
            eventId: id,
            actions: actions,
        });
        setViewModal(true);
    };

    const cardPropsPending = {
        showClub: true,
        triggerView: (id) => triggerView(id, ["approve"]),
    };

    const cardPropsApproved = {
        manage: true,
        showClub: true,
        triggerView: (id) => triggerView(id, []),
    };

    return (
        <>
            <EventModal controller={[viewModal, setViewModal]} {...viewProps} />
            <Page header="Manage Events">
                <Box mb={3}>
                    <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom>
                        PENDING APPROVAL
                    </Typography>
                    <Page
                        full
                        empty={
                            !pendingEventsLoading &&
                            !pendingEventsData?.adminGadPendingEvents?.length
                        }
                    >
                        <Grid container spacing={2} mb={2}>
                            {pendingEventsLoading
                                ? [...Array(6).keys()].map((idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard skeleton showClub />
                                      </Grid>
                                  ))
                                : pendingEventsData?.adminGadPendingEvents?.map((event, idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard {...event} {...cardPropsPending} />
                                      </Grid>
                                  ))}
                        </Grid>
                    </Page>
                </Box>

                <Box>
                    <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom>
                        APPROVED EVENTS
                    </Typography>
                    <Page
                        full
                        empty={
                            !approvedEventsLoading &&
                            !approvedEventsData?.adminApprovedEvents?.length
                        }
                    >
                        <Grid container spacing={2} mb={2}>
                            {approvedEventsLoading
                                ? [...Array(6).keys()].map((idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard skeleton showClub />
                                      </Grid>
                                  ))
                                : approvedEventsData?.adminApprovedEvents?.map((event, idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard {...event} {...cardPropsApproved} />
                                      </Grid>
                                  ))}
                        </Grid>
                    </Page>
                </Box>
            </Page>
        </>
    );
};

export default Events;
