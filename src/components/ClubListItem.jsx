import { makeStyles } from "@material-ui/core/styles";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";

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

    return (
        <Card variant="outlined" className={classes.root}>
            <CardMedia className={classes.media} image={img} title="Contemplative Reptile" />
            <Box width="100%">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {mail}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button variant="outlined" className={classes.viewButton}>
                        View
                    </Button>
                    <Button variant="outlined" className={classes.editButton}>
                        Edit
                    </Button>
                    <Button variant="outlined" className={classes.deleteButton}>
                        Delete
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ClubListItem;
