import { useState } from "react";
import { styled } from "@mui/material/styles";

import {
    Box,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    LinearProgress,
    IconButton,
    Tooltip,
} from "@mui/material";
import { EditOutlined as EditIcon, DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { linearProgressClasses } from "@mui/material/LinearProgress";

import { ISOtoDT } from "utils/DateTimeUtil";
import { StateProgress } from "utils/EventUtil";

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

const EventCard = ({ id, name, datetimeStart, state, poster, triggerView, manage = false }) => {
    // get progressbar value and color
    const stateProgress = StateProgress(state);

    return (
        <Card variant="none" sx={{ borderRadius: 2 }}>
            <CardActionArea onClick={() => triggerView(id)} sx={{ p: 1 }}>
                <CardMedia
                    sx={{ borderRadius: 2 }}
                    component="img"
                    image={poster}
                    alt={name}
                    height={180}
                />

                <CardContent sx={{ px: 0.5 }}>
                    <Typography gutterBottom color="textSecondary" variant="subtitle2">
                        {ISOtoDT(datetimeStart).datetime}
                    </Typography>
                    <Typography variant="h4">{name}</Typography>
                </CardContent>

                {!!manage && (
                    <CardContent sx={{ p: 0.5, pb: 1.5 }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            height={10}
                        >
                            <Box width={"100%"}>
                                <Tooltip title={stateProgress.text} arrow>
                                    <BorderLinearProgress
                                        value={stateProgress.value}
                                        color={stateProgress.color}
                                        variant="determinate"
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
