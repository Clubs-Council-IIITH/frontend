import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";

import ImageCarousel from "components/ImageCarousel";

import CarouselBackground1 from "assets/img/carousel/1.jpg";
import CarouselBackground2 from "assets/img/carousel/2.jpg";
import CarouselBackground3 from "assets/img/carousel/3.jpg";
import CarouselBackground4 from "assets/img/carousel/4.jpg";
import CarouselBackground5 from "assets/img/carousel/5.jpg";
import CarouselBackground6 from "assets/img/carousel/6.jpg";
import CarouselBackground7 from "assets/img/carousel/7.jpg";
import CarouselBackground8 from "assets/img/carousel/8.jpg";
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
            content: <CarouselItem title="Clubs Council" subtitle="Ensuring that student-driven campus organizations have successfully cultivated diverse campus life experiences since 2017." />,
        },
        {
            image: CarouselBackground3,
            content: <CarouselItem title="Unrestricted Fun!" subtitle="Join in on fun events!" />,
        },
        {
            image: CarouselBackground4,
            content: <CarouselItem title="Bonding" subtitle="Cheer, cherish and clap together." />,
        },
        {
            image: CarouselBackground5,
            content: <CarouselItem title="Success Stories" subtitle="Witness legends in the making." />,
        },
        {
            image: CarouselBackground6,
            content: <CarouselItem title="Night Life" subtitle="Who said Night needed to be Quiet?" />,
        },
        {
            image: CarouselBackground7,
            content: <CarouselItem title="Challengers" subtitle="Up the potential for fun." />,
        },
        {
            image: CarouselBackground8,
            content: <CarouselItem title="Perform Together" subtitle="Let the beat take over." />,
        },
        {
            image: CarouselBackground9,
            content: <CarouselItem title="Artistry" subtitle="Unleash your creativity." />,
        },
        {
            image: CarouselBackground10,
            content: <CarouselItem title="CC Website" subtitle="When Tech meets creativity." />,
        },
        {
            image: CarouselBackground11,
            content: <CarouselItem title="Unity in Diversity" subtitle="We are one." />,
        },
        {
            image: CarouselBackground12,
            content: <CarouselItem title="Community" subtitle="College nights like this" />,
        },
    ];

    return (
        <ImageCarousel gradient height={isTabletOrMobile ? "60vh" : "100vh"} contents={carousel} />
    );
};

export default Carousel;
