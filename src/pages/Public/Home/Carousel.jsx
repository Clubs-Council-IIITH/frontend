import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";

import ImageCarousel from "components/ImageCarousel";

import CarouselBackground1 from "assets/img/carousel/1.jpg";
import CarouselBackground2 from "assets/img/carousel/2.png";
import CarouselBackground3 from "assets/img/carousel/3.jpg";
import CarouselBackground4 from "assets/img/carousel/4.jpeg";
import CarouselBackground5 from "assets/img/carousel/5.jpg";
import CarouselBackground6 from "assets/img/carousel/6.jpg";
import CarouselBackground7 from "assets/img/carousel/7.jpg";
import CarouselBackground8 from "assets/img/carousel/8.jpeg";
import CarouselBackground9 from "assets/img/carousel/9.jpg";
import CarouselBackground10 from "assets/img/carousel/10.jpg";
import CarouselBackground11 from "assets/img/carousel/11.jpg";
import CarouselBackground12 from "assets/img/carousel/12.jpg";

const CarouselItem = ({ title, subtitle }) => {
    const { isTabletOrMobile } = useContext(NavigationContext);

    return (
        <Box textAlign="right" color="white" width="100%">
            <Typography variant={isTabletOrMobile ? "h4" : "h2"} fontWeight={500}>
                {title}
            </Typography>
            <Typography mt={1} variant={isTabletOrMobile ? "body1" : "h5"}>
                {subtitle}
            </Typography>
        </Box>
    );
};

const Carousel = () => {
    const { isTabletOrMobile } = useContext(NavigationContext);

    const carousel = [
        {
            image: CarouselBackground1,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground2,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground3,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground4,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground5,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground6,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground7,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground8,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground9,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground10,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground11,
            content: <CarouselItem title="Life at IIITH" subtitle="Eat. Sleep. Code? Not Quite." />,
        },
        {
            image: CarouselBackground12,
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

    return (
        <ImageCarousel gradient height={isTabletOrMobile ? "60vh" : "100vh"} contents={carousel} />
    );
};

export default Carousel;
