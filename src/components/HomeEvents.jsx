import { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";

import EventModel from "models/EventModel";

import { Box, Grid, CardMedia } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "queries/events";

import Carousel from "react-material-ui-carousel";

import Loading from "components/Loading";
import Empty from "components/Empty";

import HomeEventCard from "./cards/HomeEventCard";
import HomeNextEventCard from "./cards/HomeNextEvent";

const HomeEvents = () => {
    const theme = useTheme();

    // create/edit event form modal
    const GET_EVENTS = GET_ALL_EVENTS;
    const { data, loading } = useQuery(GET_EVENTS);
    const [events, setEvents] = useState([]);
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const targetEvents = data?.allEvents;
        setEvents(targetEvents?.map((o) => new EventModel(o)));
    }, [data]);

    useEffect(() => {
        if (events?.length) {
            const laterEvents = events.slice(1);
            const sliderItems = Number(laterEvents?.length > 3 ? 3 : laterEvents?.length);
            const items = [];
            for (let i = 0; i < laterEvents?.length; i += sliderItems) {
                if (i % sliderItems === 0) {
                    items.push(
                        <Grid container spacing={5}>
                            {laterEvents.slice(i, i + sliderItems).map((event, index) => {
                                return (
                                    <Grid item sm={4} key={index}>
                                        <HomeEventCard {...event} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    );
                }
            }

            setCarouselItems(items);
        }
    }, [events]);

    return (
        <Box>
            {loading ? (
                <Loading />
            ) : events?.length === 0 ? (
                <Empty />
            ) : (
                <Grid container spacing={5}>
                    {/* immediate next event */}
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={events?.[0].poster}
                                    alt={events?.[0].name}
                                    sx={{
                                        borderRadius: theme.borderRadius,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <HomeNextEventCard {...events?.[0]} />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* later events */}
                    <Grid item xs={12} sm={12}>
                        <Carousel indicators={false}>{carouselItems}</Carousel>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default HomeEvents;
