import { useTheme } from "@mui/styles";
import { styled } from "@mui/material/styles";

import {
    Alert,
    Avatar,
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

import { InfoOutlined as StatusIcon } from "@mui/icons-material";

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
    club,
    triggerView,
    manage = false,
    skeleton = false,
    showClub = false,
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
                        pb: 1,
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

                    <Box>
                        {showClub ? (
                            <Box display="flex" alignItems="center" pt={3}>
                                {skeleton ? (
                                    <Skeleton
                                        animation="wave"
                                        variant="circular"
                                        height={16}
                                        width={16}
                                        sx={{ mr: 1 }}
                                    />
                                ) : (
                                    <Avatar src={club?.img} sx={{ height: 16, width: 16, mr: 1 }} />
                                )}
                                <Typography variant="body2" sx={{ width: "100%" }}>
                                    {skeleton ? <Skeleton animation="wave" /> : club.name}
                                </Typography>
                            </Box>
                        ) : null}

                        {!!manage && (
                            <Box width="100%" pt={3}>
                                {skeleton ? (
                                    <Skeleton animation="wave" />
                                ) : (
                                    <Alert
                                        icon={
                                            <StatusIcon
                                                fontSize="small"
                                                sx={{ my: "auto", color: stateProgress.color[800] }}
                                            />
                                        }
                                        sx={{
                                            px: 1,
                                            py: 0,
                                            backgroundColor: stateProgress.color[100],
                                            color: stateProgress.color[800],
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {stateProgress.text}
                                        </Typography>
                                    </Alert>
                                )}
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
