import { Box, Card, CardMedia } from "@material-ui/core";

import Carousel from "react-material-ui-carousel";

const ImageCarousel = ({ gradient, contents }) => {
    return (
        <Carousel indicators={false} navButtonsAlwaysVisible>
            {contents.map((card) => (
                <Card>
                    {gradient && (
                        <div
                            style={{
                                background:
                                    "linear-gradient(170deg, rgba(17, 17, 17, 0) 12%, rgba(0, 0, 0, 0.37) 45%, #111111 75%)",
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                borderRadius: "8px",
                            }}
                        />
                    )}

                    {card?.content && (
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            style={{
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
                        style={{ borderRadius: "8px" }}
                    />
                </Card>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
