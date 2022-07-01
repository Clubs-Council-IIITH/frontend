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
} from "@mui/material";
import { green, blue, red, amber, deepPurple } from "@mui/material/colors";
import { EditOutlined as EditIcon, DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { linearProgressClasses } from "@mui/material/LinearProgress";

import { ISOtoDT } from "utils/DateTimeUtil";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? green[500] : green[200],
    },
}));

const EventCard = ({
    id,
    name,
    datetimeStart,
    state,
    poster,
    triggerEdit,
    triggerDelete,
    triggerView,
    manage = false,
    actions = false,
}) => {
    const [showActions, setShowActions] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        triggerEdit(id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        triggerDelete(id);
    };

    return (
        <Card
            variant="none"
            onMouseOver={() => setShowActions(true)}
            onMouseOut={() => setShowActions(false)}
            sx={{ borderRadius: 2 }}
        >
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
                            <Box width={!!actions && showActions ? "75%" : "100%"}>
                                <BorderLinearProgress value={50} variant="determinate" />
                            </Box>
                            {!!actions && (
                                <Box display={showActions ? "flex" : "none"}>
                                    <IconButton
                                        type="button"
                                        color="warning"
                                        onClick={handleEdit}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        type="button"
                                        color="error"
                                        onClick={handleDelete}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
