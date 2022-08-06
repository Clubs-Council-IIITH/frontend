import Page from "components/Page";

import Carousel from "./Carousel.jsx";
import Upcoming from "./Upcoming.jsx";
import Calendar from "./Calendar.jsx";

const Home = () => {
    return (
        <Page full header={null} loading={false} empty={false}>
            <Carousel />
            <Upcoming />

            <Calendar />
        </Page>
    );
};

export default Home;
