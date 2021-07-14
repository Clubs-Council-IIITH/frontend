import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { green, blue, red, amber, deepPurple } from "@material-ui/core/colors";

// styles {{{
const useStyles = makeStyles({
    cardContent: {
        minHeight: 250,
    },
    eventApproved: {
        backgroundColor: green[50],
        borderColor: green[200],
    },
    eventScheduled: {
        backgroundColor: blue[50],
        borderColor: blue[200],
    },
    eventPublished: {
        backgroundColor: deepPurple[50],
        borderColor: deepPurple[200],
    },
    eventDeleted: {
        backgroundColor: red[50],
        borderColor: red[200],
    },
    eventCompleted: {
        backgroundColor: amber[50],
        borderColor: amber[200],
    },
});
// }}}

const EventCard = ({ id, name, description, datetime, audience, state, duration }) => {
    const classes = useStyles();

    return (
        <Card
            variant="outlined"
            className={clsx({
                [classes.eventApproved]: state === "approved",
                [classes.eventScheduled]: state === "scheduled",
                [classes.eventPublished]: state === "published",
                [classes.eventDeleted]: state === "deleted",
                [classes.eventCompleted]: state === "completed",
            })}
        >
            <CardActionArea onClick={null}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom color="textSecondary" variant="subtitle2">
                        {datetime}
                    </Typography>
                    <Typography variant="h4" component="h4">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
