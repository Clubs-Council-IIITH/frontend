import { useState, useContext } from "react";
import { useTheme } from "@mui/styles";

import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "queries/events";

import { Grid, Box, Typography, Stack, Pagination } from "@mui/material";
import { NavigationContext } from "contexts/NavigationContext";

import Empty from "components/Empty";
import EventModal from "components/modals/EventModal";
import EventCardMini from "components/cards/EventCardMini";
import EventStates from "constants/EventStates";

const Upcoming = () => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);

    // control number of events per row
    const EVENTS_PER_ROW = isTabletOrMobile ? 1 : 4;

    // scrolling page
    const [page, setPage] = useState(1);

    // event modal
    const [viewProps, setViewProps] = useState({});
    const [viewModal, setViewModal] = useState(false);

    // fetch upcoming events (TODO: replace query with 'GET_UPCOMING_EVENTS')
    const { data: upcomingData, loading: upcomingLoading } = useQuery(GET_ALL_EVENTS, {
        pollInterval: 1000 * 60 * 2, // 2 minutes
    });

    // open view modal
    const triggerView = (id) => {
        setViewProps({ eventId: id });
        setViewModal(true);
    };

    const cardProps = {
        triggerView,
    };

    return (
        <>
            <EventModal controller={[viewModal, setViewModal]} {...viewProps} />
            <Box p={3} backgroundColor={theme.palette.grey[100]}>
                <Box pb={3} display="flex" justifyContent="space-between" alignItem="center">
                    <Typography variant="h5" fontWeight={500}>
                        Upcoming Events
                    </Typography>
                    <Stack spacing={2}>
                        {!upcomingLoading ? (
                            <Pagination
                                size="small"
                                page={page}
                                count={Math.ceil(upcomingData?.allEvents?.length / EVENTS_PER_ROW)}
                                onChange={(_, v) => setPage(v)}
                            />
                        ) : null}
                    </Stack>
                </Box>
                <Box>
                    {upcomingLoading ? (
                        <Grid container direction="row" spacing={3}>
                            {[...Array(EVENTS_PER_ROW).keys()].map((key) => (
                                <EventCardMini
                                    key={key}
                                    width={parseInt(12 / EVENTS_PER_ROW)}
                                    skeleton={true}
                                />
                            ))}
                        </Grid>
                    ) : upcomingData?.allEvents?.filter(
                          (event) => event?.state === EventStates["completed"]
                      )?.length === 0 ? (
                        <Empty />
                    ) : (
                        <Grid container direction="row" spacing={3}>
                            {upcomingData?.allEvents
                                ?.slice(EVENTS_PER_ROW * (page - 1), EVENTS_PER_ROW * page)
                                ?.filter((event) => event?.state === EventStates["completed"])
                                ?.map((event) => (
                                    <EventCardMini
                                        {...event}
                                        {...cardProps}
                                        width={parseInt(12 / EVENTS_PER_ROW)}
                                        skeleton={upcomingLoading}
                                    />
                                ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Upcoming;
