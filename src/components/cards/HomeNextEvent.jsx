import { Box, Avatar, Card, CardContent, Typography } from "@mui/material";
import { LocationOn, Group } from "@mui/icons-material";

import { ISOtoDT } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";

const HomeNextEventCard = ({
    name,
    datetimeStart,
    datetimeEnd,
    venue,
    club,
    description,
    audience,
}) => {
    return (
        <Card variant="outlined" sx={{ border: "none" }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography color="textPrimary" variant="h3">
                        {name}
                    </Typography>

                    <Box mt={1}>
                        <Typography gutterBottom color="textSecondary" variant="subtitle1">
                            {`${ISOtoDT(datetimeStart).datetime} — ${
                                ISOtoDT(datetimeEnd).datetime
                            }`}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mt={2}>
                    <Avatar src={club?.img} style={{ height: "24px", width: "24px" }} />
                    <Box mx={2}>
                        <Typography variant="body1" sx={{ fontSize: "1.1em" }}>
                            {club?.name}
                        </Typography>
                    </Box>
                </Box>

                <Box my={6}>
                    <Typography variant="body1" sx={{ fontSize: "1.1em", whiteSpace: "pre-line" }}>
                        {description}
                    </Typography>
                </Box>

                <Box>
                    <Typography my={2}>
                        <Box display="flex" alignItems="center">
                            <Group />
                            <Box mx={2}>{AudienceFormatter(audience)}</Box>
                        </Box>
                    </Typography>

                    <Typography my={2}>
                        <Box display="flex" alignItems="center">
                            <LocationOn />
                            <Box mx={2}>{venue}</Box>
                        </Box>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default HomeNextEventCard;
