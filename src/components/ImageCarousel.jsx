import { Box, Card, CardMedia } from "@mui/material";
import { useTheme } from "@mui/styles";

import Carousel from "react-material-ui-carousel";

const ImageCarousel = ({ gradient, contents }) => {
    const theme = useTheme();

    return (
        <Carousel indicators={false} navButtonsAlwaysVisible>
            {contents.map((card, idx) => (
                <Card key={idx}>
                    {gradient && (
                        <Box
                            sx={{
                                background:
                                    "linear-gradient(170deg, rgba(17, 17, 17, 0) 12%, rgba(0, 0, 0, 0.37) 45%, #111111 75%)",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                borderRadius: theme.borderRadius,
                            }}
                        />
                    )}

                    {card?.content && (
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            sx={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                padding: "2.4em",
                            }}
                        >
                            {card?.content}
                        </Box>
                    )}

                    <CardMedia
                        component="img"
                        height="450px"
                        image={card?.image}
                        alt={null}
                        sx={{ borderRadius: theme.borderRadius }}
                    />
                </Card>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
