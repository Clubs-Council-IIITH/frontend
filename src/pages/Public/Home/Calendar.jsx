import { Box, Typography } from "@mui/material";
import EventCalendar from "components/EventCalendar";

const Calendar = () => {
    return (
        <Box px={3} py={3}>
            <Typography variant="h5" fontWeight={500} gutterBottom pb={2}>
                Event Calendar
            </Typography>
            <EventCalendar />
        </Box>
    );
};

export default Calendar;
