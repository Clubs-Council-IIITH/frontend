import Page from "components/Page";

import Carousel from "./Carousel.jsx";
import Upcoming from "./Upcoming.jsx";
import About from "./About.jsx";
import Gallery from "./Gallery.jsx";
import Footer from "./Footer.jsx";

const Home = () => {
    return (
        <Page full header={null} loading={false} empty={false}>
            <Carousel />
            <Upcoming />
            <About />
            <Gallery />
            <Footer />
        </Page>
    );
};

export default Home;
