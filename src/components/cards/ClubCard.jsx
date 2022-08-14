import { useTheme } from "@mui/styles";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Card, CardActionArea, CardContent, CardMedia, Typography, Skeleton } from "@mui/material";

const ClubCard = ({ id, img, name, tagline, skeleton = false }) => {
    const theme = useTheme();
    const history = useHistory();
    const match = useRouteMatch();

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
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
                onClick={() => history.push(`${match.url}/${id}`)}
            >
                {skeleton ? (
                    <Skeleton height={200} width="100%" animation="wave" variant="rectangular" />
                ) : (
                    <CardMedia
                        sx={{
                            height: 200,
                            width: "100%",
                        }}
                        image={img}
                        title={name}
                        component="img"
                        loading="lazy"
                    />
                )}
                <CardContent
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 2,
                    }}
                >
                    <Typography gutterBottom variant="h6" fontWeight={400}>
                        {skeleton ? <Skeleton animation="wave" /> : name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {skeleton ? <Skeleton animation="wave" /> : tagline}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ClubCard;
