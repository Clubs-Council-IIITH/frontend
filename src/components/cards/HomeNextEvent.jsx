import { makeStyles } from "@mui/styles";

import { Box, Avatar, Card, CardContent, Typography } from "@mui/material";
import { LocationOn, Group } from "@mui/icons-material";
import { green, blue, red, amber, deepPurple } from "@mui/material/colors";

import { ISOtoDT } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";

// styles {{{
const useStyles = makeStyles((theme) => ({
    cardContent: {
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
    },
    club: {
        position: "relative",
        top: "3rem",
    },
    description: {
        position: "relative",
        top: "7rem",
    },
    audience: {
        position: "relative",
        top: "14rem",
    },
    venue: {
        position: "relative",
        top: "15rem",
    },
    statusText: {
        textTransform: "uppercase",
        fontFamily: theme.typography.fontFamilySecondary,
        fontWeight: 700,
    },
    eventApproved: {
        backgroundColor: green[50],
        borderColor: green[200],
        color: green[500],
    },
    eventScheduled: {
        backgroundColor: blue[50],
        borderColor: blue[200],
        color: blue[500],
    },
    eventPublished: {
        backgroundColor: deepPurple[50],
        borderColor: deepPurple[200],
        color: deepPurple[500],
    },
    eventDeleted: {
        backgroundColor: red[50],
        borderColor: red[200],
        color: red[500],
    },
    eventCompleted: {
        backgroundColor: amber[50],
        borderColor: amber[200],
        color: amber[500],
    },
}));
// }}}

const HomeNextEventCard = ({
    name,
    datetimeStart,
    datetimeEnd,
    venue,
    club,
    description,
    audience,
}) => {
    const classes = useStyles();

    return (
        <Card variant="outlined" style={{ border: "none" }}>
            <CardContent className={classes.cardContent}>
                <Typography color="textPrimary" variant="h3">
                    {name}
                </Typography>

                <Box mt={1}>
                    <Typography gutterBottom color="textSecondary" variant="subtitle1">
                        {`${ISOtoDT(datetimeStart).datetime} — ${ISOtoDT(datetimeEnd).datetime}`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={2}>
                    <Avatar src={club?.img} style={{ height: "24px", width: "24px" }} />
                    <Box mx={2}>
                        <Typography variant="subtitle2">{club?.name}</Typography>
                    </Box>
                </Box>

                <Typography className={classes.description}>{description}</Typography>

                <Typography className={classes.audience}>
                    <Box display="flex" alignItems="center">
                        <Group />
                        <Box mx={2}>{AudienceFormatter(audience)}</Box>
                    </Box>
                </Typography>

                <Typography className={classes.venue}>
                    <Box display="flex" alignItems="center">
                        <LocationOn />
                        <Box mx={2}>{venue}</Box>
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HomeNextEventCard;
