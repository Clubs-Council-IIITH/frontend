import { useTheme } from "@mui/styles";

import { Box, ImageList, ImageListItem } from "@mui/material";

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

const itemData = [
    {
        img: Img1,
        title: "Music-Stage",
    },
    {
        img: Img2,
        title: "Big-Events",
    },
    {
        img: Img3,
        title: "Music",
    },
    {
        img: Img4,
        title: "Sanskrit-Talks",
    },
    {
        img: Img5,
        title: "FHC",
    },
    {
        img: Img6,
        title: "Astronomy",
    },
    {
        img: Img7,
        title: "Felicity-Gaming-2021",
    },
    {
        img: Img8,
        title: "Drum-Set",
    },
    {
        img: Img9,
        title: "Singing",
    },
    {
        img: Img10,
        title: "Group-Pic-Debsoc",
    },
];

const Gallery = () => {
    const theme = useTheme();

    return (
        <Box p={5} pt={1} backgroundColor={theme.palette.primary.main}>
            <ImageList variant="masonry" cols={3} gap={12}>
                {itemData.map((item) => (
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
        </Box>
    );
};

export default Gallery;
