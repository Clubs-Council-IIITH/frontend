import { Box, Typography } from "@mui/material";

import ImageCarousel from "components/ImageCarousel";

import CarouselBackground1 from "assets/img/carousel/1.png";
import CarouselBackground2 from "assets/img/carousel/2.jpg";
import CarouselBackground3 from "assets/img/carousel/3.jpg";
import CarouselBackground4 from "assets/img/carousel/4.jpeg";
import CarouselBackground5 from "assets/img/carousel/5.jpg";
import CarouselBackground6 from "assets/img/carousel/6.jpg";
import CarouselBackground7 from "assets/img/carousel/7.jpg";
import CarouselBackground8 from "assets/img/carousel/8.jpeg";
import CarouselBackground9 from "assets/img/carousel/9.jpg";

const Carousel = () => {
    const carousel = [
        {
            image: CarouselBackground2,
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
        {
            image: CarouselBackground1,
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
            image: CarouselBackground3,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}></Typography>
                    </Box>
                    <Typography variant="h5"></Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground4,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>
                            Bonding
                        </Typography>
                    </Box>
                    <Typography variant="h5">Cheer, cherish and clap together</Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground5,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}></Typography>
                    </Box>
                    <Typography variant="h5"> </Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground6,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>
                            Night Life
                        </Typography>
                    </Box>
                    <Typography variant="h5">Who said Night needed to be Quiet?</Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground7,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}></Typography>
                    </Box>
                    <Typography variant="h5"> </Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground8,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}></Typography>
                    </Box>
                    <Typography variant="h5"> </Typography>
                </Box>
            ),
        },
        {
            image: CarouselBackground9,
            content: (
                <Box sx={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}></Typography>
                    </Box>
                    <Typography variant="h5"> </Typography>
                </Box>
            ),
        },
    ];

    return <ImageCarousel gradient height="100vh" contents={carousel} />;
};

export default Carousel;
