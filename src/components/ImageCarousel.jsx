import { Box, Card, CardMedia } from "@mui/material";

import Carousel from "react-material-ui-carousel";

const ImageCarousel = ({ height, gradient, contents }) => {
    return (
        <Carousel height={height} indicators={false} stopAutoPlayOnHover={false} animation="slide">
            {contents.map((card, idx) => (
                <Card key={idx} sx={{ borderRadius: 0 }}>
                    {gradient && (
                        <Box
                            sx={{
                                background:
                                    "linear-gradient(170deg, rgba(17, 17, 17, 0) 12%, rgba(0, 0, 0, 0.37) 45%, #111111 75%)",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
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
                        image={card?.image}
                        alt={null}
                        sx={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100vh",
                        }}
                    />
                </Card>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
