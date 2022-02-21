import { Box, Container, Typography } from "@material-ui/core";

import Page from "components/Page";
import HomeEvents from "components/HomeEvents";
import HomeCalendar from "components/HomeCalendar";
import ImageCarousel from "components/ImageCarousel";
import Banner from "components/Banner";

import CarouselBackgroundOne from "assets/img/carousel/1.png";
import { EmojiEventsOutlined } from "@material-ui/icons";

const Home = () => {
    const carousel = [
        {
            image: CarouselBackgroundOne,
            content: (
                <Box style={{ color: "#fff", textAlign: "right", width: "800px" }}>
                    <Box my={2}>
                        <Typography variant="h2" style={{ fontWeight: 500 }}>
                            Some Headline Here
                        </Typography>
                    </Box>
                    <Typography variant="h5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua
                    </Typography>
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
                        borderRadius: "8px",
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
