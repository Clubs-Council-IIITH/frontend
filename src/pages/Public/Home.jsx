import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

import Page from "components/Page";
import HomeEvents from "components/HomeEvents";
import HomeCalendar from "components/HomeCalendar";
import ImageCarousel from "components/ImageCarousel";
import Banner from "components/Banner";

import CarouselBackgroundOne from "assets/img/carousel/1.png";
import CarouselBackgroundTwo from "assets/img/carousel/2.jpg";
import { EmojiEventsOutlined } from "@mui/icons-material";

const Home = () => {
    const theme = useTheme();

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

    return (
        <Page header={null} loading={false} empty={false}>
            <Container maxWidth={null} my={6}>
                <Box my={6}>
                    <ImageCarousel gradient contents={carousel} />
                </Box>

                <Box my={6}>
                    <Box my={3}>
                        <Typography variant="h3" style={{ fontWeight: 500 }}>
                            Coming up soon...
                        </Typography>
                    </Box>
                    <HomeEvents />
                </Box>

                <Banner
                    content={"Some statistic about clubs or events here."}
                    Icon={EmojiEventsOutlined}
                />

                <Box
                    my={6}
                    style={{
                        backgroundColor: "#fafafa",
                        padding: "2em",
                        borderRadius: theme.borderRadius,
                    }}
                >
                    <Box my={3} mb={6}>
                        <Typography variant="h3" style={{ fontWeight: 500 }}>
                            Event Calendar
                        </Typography>
                    </Box>
                    <HomeCalendar />
                </Box>
            </Container>
        </Page>
    );
};

export default Home;
