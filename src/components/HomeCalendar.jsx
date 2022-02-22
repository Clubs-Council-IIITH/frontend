import { useState, useEffect } from "react";

import EventModel from "models/EventModel";

import { Box } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "queries/events";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const HomeCalendar = () => {
    const localizer = momentLocalizer(moment);

    const { data, loading } = useQuery(GET_ALL_EVENTS);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        setEvents(
            data?.allEvents?.map((e) => ({
                start: moment(e.datetimeStart).toDate(),
                end: moment(e.datetimeEnd).toDate(),
                title: e.name,
            }))
        );
    }, [data]);

    return (
        <Box>
            <Calendar
                defaultDate={new Date()}
                defaultView="month"
                localizer={localizer}
                events={events}
                style={{ height: "80vh" }}
            />
        </Box>
    );
};

export default HomeCalendar;
