import { Redirect } from "react-router-dom";
import Page from "components/Page";
import HomeCalendar from "../../components/HomeCalendar"

const Home = () => {

    return (
        <Page header={"Home"} loading={false} empty={false}>
            <HomeCalendar/>
        </Page>
    );
};

export default Home;
