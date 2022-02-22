import { makeStyles } from "@mui/styles";

import { CardMedia, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { ISOtoDT } from "utils/DateTimeUtil";

// styles {{{
const useStyles = makeStyles((theme) => ({
    cardContent: {
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
    },
}));
// }}}

const HomeEventCard = ({ id, name, poster, datetimeStart }) => {
    const classes = useStyles();

    return (
        <Card variant="outlined" style={{ border: "none" }}>
            <CardActionArea onClick={null}>
                <CardMedia
                    component="img"
                    height="250"
                    image={poster}
                    alt={name}
                    style={{ borderRadius: "8px" }}
                />
                <CardContent className={classes.cardContent}>
                    <Typography color="textPrimary" variant="h5">
                        {name}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                        {ISOtoDT(datetimeStart).datetime}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default HomeEventCard;
