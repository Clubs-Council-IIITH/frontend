import { Redirect } from "react-router-dom";
import Page from "components/Page";
import HomeEvents from "../../components/HomeEvents";

const Home = () => {

    return (
        <Page header={"Home"} loading={false} empty={false}>
            <HomeEvents />
        </Page>
    );
};

export default Home;
