import { useState } from "react";
import { useTheme } from "@mui/styles";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_EVENT_BUDGET } from "queries/finance";
import {
    ADMIN_CC_PENDING_EVENTS,
    ADMIN_GET_EVENT_DISCUSSION,
    ADMIN_GET_ALL_EVENTS,
} from "queries/events";
import { PROGRESS_EVENT, SEND_DISCUSSION_MESSAGE } from "mutations/events";

import { Box, Grid, Typography } from "@mui/material";

import Page from "components/Page";

import EventStates from "constants/EventStates";
import EventModal from "components/modals/EventModal";
import { EventCard } from "components/cards";

const Events = () => {
    const theme = useTheme();

    const { data: pendingEventsData, loading: pendingEventsLoading } =
        useQuery(ADMIN_CC_PENDING_EVENTS);

    const { data: allEventsData, loading: allEventsLoading } = useQuery(ADMIN_GET_ALL_EVENTS);

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
                            !pendingEventsData?.adminCcPendingEvents?.length
                        }
                    >
                        <Grid container spacing={2} mb={2}>
                            {pendingEventsLoading
                                ? [...Array(6).keys()].map((idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard skeleton showClub />
                                      </Grid>
                                  ))
                                : pendingEventsData?.adminCcPendingEvents?.map((event, idx) => (
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
                    <Page full empty={!allEventsLoading && !allEventsData?.adminAllEvents?.length}>
                        <Grid container spacing={2} mb={2}>
                            {allEventsLoading
                                ? [...Array(6).keys()].map((idx) => (
                                      <Grid item md={4} lg={3} key={idx}>
                                          <EventCard skeleton showClub />
                                      </Grid>
                                  ))
                                : allEventsData?.adminAllEvents?.map((event, idx) => (
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
