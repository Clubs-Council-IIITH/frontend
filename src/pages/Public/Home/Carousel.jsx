import { Box, Typography } from "@mui/material";

import ImageCarousel from "components/ImageCarousel";

import CarouselBackgroundOne from "assets/img/carousel/1.png";
import CarouselBackgroundTwo from "assets/img/carousel/2.jpg";

const Carousel = () => {
    const carousel = [
        {
            image: CarouselBackgroundOne,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>
                            Clubs Council
                        </Typography>
                    </Box>
                    <Typography variant="h5">
                        Ensuring that student-driven organizations on campus are successful in their
                        aim to cultivate diverse campus life experiences, since 2017.
                    </Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackgroundTwo,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>
                            Life at IIITH
                        </Typography>
                    </Box>
                    <Typography variant="h5">Eat. Sleep. Code? Not Quite.</Typography>
                </Box>
            ),
        },
    ];

    return <ImageCarousel gradient height="100vh" contents={carousel} />;
};

export default Carousel;
