import { useContext, useState } from "react";
import { useTheme } from "@mui/styles";

import { NavigationContext } from "contexts/NavigationContext";

import { Box, ImageList, ImageListItem, Button } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import Img1 from "assets/img/gallery/1.jpg";
import Img2 from "assets/img/gallery/2.jpg";
import Img3 from "assets/img/gallery/3.jpeg";
import Img4 from "assets/img/gallery/4.jpeg";
import Img5 from "assets/img/gallery/5.jpg";
import Img6 from "assets/img/gallery/6.jpeg";
import Img7 from "assets/img/gallery/7.jpg";
import Img8 from "assets/img/gallery/8.jpg";
import Img9 from "assets/img/gallery/9.jpg";
import Img10 from "assets/img/gallery/10.jpg";
import Img11 from "assets/img/gallery/11.jpg";
import Img12 from "assets/img/gallery/12.jpeg";
import Img13 from "assets/img/gallery/13.jpg";
import Img14 from "assets/img/gallery/14.jpg";
import Img15 from "assets/img/gallery/15.jpeg";
import Img16 from "assets/img/gallery/16.jpg";
import Img17 from "assets/img/gallery/17.jpg";
import Img18 from "assets/img/gallery/18.jpg";
import Img19 from "assets/img/gallery/19.jpg";
import Img20 from "assets/img/gallery/20.jpg";
import Img21 from "assets/img/gallery/21.jpg";
import Img22 from "assets/img/gallery/22.jpg";

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

const moreItemData = [
    {
        img: Img19,
        title: "Silver-Jubilee Launch",
    },
    {
        img: Img1,
        title: "Music-Stage",
    },
    {
        img: Img2,
        title: "Big-Events",
    },
    {
        img: Img5,
        title: "FHC",
    },
    {
        img: Img7,
        title: "Felicity-Gaming-2021",
    },
    {
        img: Img9,
        title: "Singing",
    },
    {
        img: Img10,
        title: "Group-Pic-Debsoc",
    },
    {
        img: Img13,
        title: "KRB-Auditorium",
    },
    {
        img: Img14,
        title: "KRB",
    },
    {
        img: Img15,
        title: "Freshers-Dance",
    },
    {
        img: Img17,
        title: "Flag-Hoisting",
    },
    {
        img: Img18,
        title: "Independence-Day-Songs",
    },
    {
        img: Img20,
        title: "ERC Workshop",
    },
    {
        img: Img21,
        title: "Sreyas Photography",
    },
    {
        img: CarouselBackground1,
        title: "Roadblock",
    },
    {
        img: CarouselBackground3,
        title: "Debsoc-LokSabha",
    },
    {
        img: CarouselBackground5,
        title: "Fail",
    },
    {
        img: CarouselBackground6,
        title: "Singing",
    },
    {
        img: CarouselBackground7,
        title: "Chess",
    },
    {
        img: CarouselBackground8,
        title: "Classical-Dance",
    },
    {
        img: CarouselBackground9,
        title: "Himalaya",
    },
    {
        img: CarouselBackground10,
        title: "CC-Website-Launch",
    },
    {
        img: CarouselBackground11,
        title: "Flag-and-Aftab-sir",
    },
    {
        img: CarouselBackground12,
        title: "FHC Open-Mic",
    },
];

const reducedItemData = [
    {
        img: CarouselBackground2,
        title: "Intro-to-Clubs",
    },
    {
        img: Img3,
        title: "Music",
    },
    {
        img: Img4,
        title: "Dance-Freshers",
    },
    {
        img: Img6,
        title: "Astronomy",
    },
    {
        img: Img8,
        title: "Drum-Set",
    },
    {
        img: Img11,
        title: "Felicity-Dance",
    },
    {
        img: Img12,
        title: "Sanskrit-Talks",
    },
    {
        img: CarouselBackground4,
        title: "Fun-in-H105",
    },
    {
        img: Img22,
        title: "Aditya Nair",
    },
    {
        img: Img16,
        title: "Hooting",
    },
];

const Gallery = () => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);

    const [expanded, setExpanded] = useState(false);

    const fullItemData = [...reducedItemData, ...moreItemData];

    return (
        <Box p={3} pt={1} backgroundColor={theme.palette.primary.main}>
            {expanded ? (
                <ImageList variant="masonry" cols={isTabletOrMobile ? 2 : 3} gap={12}>
                    {fullItemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <>
                    <ImageList variant="masonry" cols={isTabletOrMobile ? 2 : 3} gap={12}>
                        {reducedItemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Button
                        fullWidth
                        disableElevation
                        variant="contained"
                        onClick={() => setExpanded(true)}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        View More
                        <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Gallery;
