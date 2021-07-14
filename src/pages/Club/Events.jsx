import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid } from "@material-ui/core";

import Page from "components/Page";
import EventCard from "components/EventCard";

import EventService from "services/EventService";

const Events = () => {
    const { clubId } = useParams();

    const [events, setEvents] = useState({ loading: true });

    // fetch list of events from API
    useEffect(() => {
        (async () => setEvents(await EventService.getEventsByClubId(clubId)))();
    }, [clubId]);

    return (
        <Page full loading={events?.loading} empty={!events?.data?.length}>
            <Box p={3}>
                <Grid container spacing={2}>
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard manage {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} lg={3} key={idx}>
                            <EventCard {...event} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Page>
    );
};

export default Events;
