import { useTheme } from "@mui/styles";
import { styled } from "@mui/material/styles";

import {
    Box,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    LinearProgress,
    Skeleton,
    Tooltip,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";

import { ISOtoDT } from "utils/DateTimeUtil";
import { StateProgress } from "utils/EventUtil";

const FALLBACK_EVENT_POSTER =
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const BorderLinearProgress = styled(LinearProgress, {
    shouldForwardProp: (prop) => prop !== "color",
})(({ color, theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? color[500] : color[200],
    },
}));

const EventCard = ({
    id,
    name,
    datetimeStart,
    state,
    poster,
    triggerView,
    manage = false,
    skeleton = false,
}) => {
    const theme = useTheme();

    // get progressbar value and color
    const stateProgress = StateProgress(state);

    return (
        <Card
            variant="outlined"
            className="elevate"
            sx={{
                height: "100%",
                borderRadius: theme.borderRadius,
            }}
        >
            <CardActionArea
                sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                    width: "100%",
                }}
                onClick={() => triggerView(id)}
            >
                {skeleton ? (
                    <Skeleton
                        sx={{ borderRadius: theme.borderRadius }}
                        height={180}
                        width="100%"
                        variant="rectangular"
                        animation="wave"
                    />
                ) : (
                    <CardMedia
                        sx={{ borderRadius: theme.borderRadius }}
                        component="img"
                        image={poster || FALLBACK_EVENT_POSTER}
                        alt={name}
                        height={200}
                    />
                )}

                <CardContent
                    sx={{
                        px: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 2,
                        width: "100%",
                    }}
                >
                    <Box>
                        <Typography gutterBottom color="textSecondary" variant="subtitle2">
                            {skeleton ? (
                                <Skeleton animation="wave" />
                            ) : (
                                ISOtoDT(datetimeStart).datetime
                            )}
                        </Typography>
                        <Typography variant="h5">
                            {skeleton ? <Skeleton animation="wave" /> : name}
                        </Typography>
                    </Box>

                    {!!manage && (
                        <Box width="100%" pt={3}>
                            {skeleton ? (
                                <Skeleton animation="wave" />
                            ) : (
                                <Tooltip title={stateProgress.text} arrow>
                                    <BorderLinearProgress
                                        value={stateProgress.value}
                                        color={stateProgress.color}
                                        variant="determinate"
                                    />
                                </Tooltip>
                            )}
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
