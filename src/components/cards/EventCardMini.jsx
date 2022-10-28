import { useTheme } from "@mui/styles";

import {
    Box,
    Fade,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Grid,
    Typography,
    Skeleton,
} from "@mui/material";

import { ISOtoDT } from "utils/DateTimeUtil";

const EVENT_POSTER_HEIGHT = 200;
const FALLBACK_EVENT_POSTER =
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const EventCardMini = ({
    id,
    name,
    datetimeStart,
    club,
    poster,
    width,
    triggerView,
    skeleton = false,
}) => {
    const theme = useTheme();

    return (
        <Fade in={true} key={id} timeout={500}>
            <Grid item xs={width}>
                <Card variant="outlined" sx={{ borderRadius: theme.borderRadius, height: "100%" }}>
                    <CardActionArea onClick={() => triggerView(id)} sx={{ height: "100%" }}>
                        {skeleton ? (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width="100%"
                                height={EVENT_POSTER_HEIGHT}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                image={poster || FALLBACK_EVENT_POSTER}
                                height={EVENT_POSTER_HEIGHT}
                            />
                        )}

                        <CardContent sx={{ px: 1, height: "100%" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    {skeleton ? (
                                        <Skeleton animation="wave" height="100%" />
                                    ) : (
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                sx={{ textTransform: "uppercase" }}
                                            >
                                                {ISOtoDT(datetimeStart).month}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {ISOtoDT(datetimeStart).day}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" fontWeight={500} gutterBottom>
                                        {skeleton ? <Skeleton animation="wave" /> : name}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {skeleton ? <Skeleton animation="wave" /> : club?.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Fade>
    );
};

export default EventCardMini;
