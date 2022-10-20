import moment from "moment";

import { useContext, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "queries/events";

import { Calendar, momentLocalizer } from "react-big-calendar";

import { NavigationContext } from "contexts/NavigationContext";

import "react-big-calendar/lib/css/react-big-calendar.css";

const EventCalendar = () => {
    const localizer = momentLocalizer(moment);
    const { isTabletOrMobile } = useContext(NavigationContext);

    const { data, loading } = useQuery(GET_ALL_EVENTS, {
        pollInterval: 1000 * 60 * 5, // 5 minutes
    });
    const [events, setEvents] = useState([]);
    useEffect(() => {
        setEvents(
            data?.allEvents?.map((e) => ({
                start: moment(e.datetimeStart).toDate(),
                end: moment(e.datetimeEnd).toDate(),
                title: e.name,
            })) || []
        );
    }, [data]);

    return (
        <Box>
            <Calendar
                defaultDate={new Date()}
                defaultView={isTabletOrMobile ? "agenda" : "month"}
                localizer={localizer}
                events={events}
                style={{ height: "80vh" }}
            />
        </Box>
    );
};

export default EventCalendar;
