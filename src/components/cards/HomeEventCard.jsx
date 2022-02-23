import { useTheme } from "@mui/styles";

import {
    Box,
    Avatar,
    CardMedia,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@mui/material";

import { ISOtoDT } from "utils/DateTimeUtil";

const HomeEventCard = ({ id, name, club, poster, datetimeStart }) => {
    const theme = useTheme();

    return (
        <Card variant="outlined" style={{ border: "none" }}>
            <CardActionArea onClick={null}>
                <CardMedia
                    component="img"
                    height="250"
                    image={poster}
                    alt={name}
                    sx={{ borderRadius: theme.borderRadius }}
                />
                <CardContent
                    sx={{
                        minHeight: 100,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography color="textPrimary" variant="h5">
                        {name}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                        {ISOtoDT(datetimeStart).datetime}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={2}>
                        <Avatar src={club?.img} style={{ height: "24px", width: "24px" }} />
                        <Box mx={2}>
                            <Typography variant="body1" sx={{ fontSize: "1.1em" }}>
                                {club?.name}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default HomeEventCard;
