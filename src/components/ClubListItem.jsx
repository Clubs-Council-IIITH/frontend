import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Button, Card, CardActions, Grid, CardContent, Typography } from "@material-ui/core";

import { blue, amber, red } from "@material-ui/core/colors";

// styles {{{
const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    media: {
        width: 200,
    },
    actions: {
        justifyContent: "flex-end",
    },
    viewButton: {
        borderColor: blue["A700"],
        color: blue["A700"],
    },
    editButton: {
        borderColor: amber["A700"],
        color: amber["A700"],
    },
    deleteButton: {
        borderColor: red["A700"],
        color: red["A700"],
    },
});
// }}}

const ClubListItem = ({ id, img, name, mail, state }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card variant="outlined" className={classes.root}>
            <Box display="flex" alignItems="center" width="100%" px={2} py={1}>
                <Grid container>
                    <Grid item xs={5}>
                        <Box display="flex" alignItems="center" height="100%">
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" height="100%">
                            <Typography variant="subtitle2" color="textSecondary">
                                {mail}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box display="flex" justifyContent="flex-end">
                            <Box m={1}>
                                <Button
                                    variant="outlined"
                                    className={classes.viewButton}
                                    onClick={() => history.push(`/clubs/${id}`)}
                                >
                                    View
                                </Button>
                            </Box>
                            <Box m={1}>
                                <Button variant="outlined" className={classes.editButton}>
                                    Edit
                                </Button>
                            </Box>
                            <Box m={1}>
                                <Button variant="outlined" className={classes.deleteButton}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default ClubListItem;
