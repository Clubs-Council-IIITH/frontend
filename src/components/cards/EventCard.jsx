import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { green, blue, red, amber, deepPurple } from "@material-ui/core/colors";
import { EditOutlined as EditIcon, DeleteOutlined as DeleteIcon } from "@material-ui/icons";

import { EditButton, DeleteButton } from "components/buttons";

import { ISOtoDT } from "utils/DateTimeUtil";

// styles {{{
const useStyles = makeStyles((theme) => ({
    cardContent: {
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
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

const EventCard = ({ id, name, datetime, state, triggerEdit, triggerDelete, manage = false }) => {
    const classes = useStyles();

    return (
        <Card
            variant="outlined"
            className={
                manage &&
                clsx({
                    [classes.eventApproved]: state === "APPROVED",
                    [classes.eventScheduled]: state === "SCHEDULED",
                    [classes.eventPublished]: state === "PUBLISHED",
                    [classes.eventDeleted]: state === "DELETED",
                    [classes.eventCompleted]: state === "COMPLETED",
                })
            }
        >
            <CardActionArea onClick={null}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom color="textSecondary" variant="subtitle2">
                        {ISOtoDT(datetime).datetime}
                    </Typography>
                    <Typography color="textPrimary" variant="h4" component="h4">
                        {name}
                    </Typography>
                    {!!manage && (
                        <Box
                            display="flex"
                            flexGrow={2}
                            flexDirection="column"
                            justifyContent="flex-end"
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography className={classes.statusText}>{state}</Typography>
                                <Box>
                                    <EditButton
                                        noPadding
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            triggerEdit(id);
                                        }}
                                    >
                                        <EditIcon />
                                    </EditButton>
                                    <DeleteButton
                                        noPadding
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            triggerDelete(id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </DeleteButton>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
