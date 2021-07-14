import { useHistory, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";

// styles {{{
const useStyles = makeStyles({
    media: {
        height: 200,
    },
});
// }}}

const ClubCard = ({ id, img, name, description, state }) => {
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch();

    return (
        <Card variant="outlined">
            <CardActionArea onClick={() => history.push(`${match.url}/${id}`)}>
                <CardMedia className={classes.media} image={img} title="Contemplative Reptile" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ClubCard;
