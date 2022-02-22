import { useHistory, useRouteMatch } from "react-router-dom";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const ClubCard = ({ id, img, name, tagline }) => {
    const history = useHistory();
    const match = useRouteMatch();

    return (
        <Card
            variant="outlined"
            className="elevate"
            sx={{
                height: "100%",
                borderRadius: "8px",
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
                <CardMedia
                    sx={{
                        height: 200,
                        width: "100%",
                    }}
                    image={img}
                    title="Contemplative Reptile"
                />
                <CardContent
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 2,
                    }}
                >
                    <Typography gutterBottom variant="h5" component="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {tagline}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ClubCard;
