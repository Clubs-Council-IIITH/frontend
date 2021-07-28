import { Redirect } from "react-router-dom";
import Page from "components/Page";

const Home = () => {
    return <Redirect to="/clubs" />;

    return (
        <Page header={"Home"} loading={false} empty={false}>
            <h1> TODO </h1>
        </Page>
    );
};

export default Home;
