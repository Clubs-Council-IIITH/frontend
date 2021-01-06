import "./styles.scss";

import PageContainer from "components/PageContainer";
import TabBar from "components/Tabs";
import ClubImgPlaceholder from "./assets/club-img-placeholder.jpg";

const tabs = [
    { title: "About", component: <h1> about </h1> },
    { title: "Events", component: <h1> events </h1> },
    { title: "Activity", component: <h1> activity </h1> },
    { title: "Members", component: <h1> members </h1> },
];

const View = () => {
    return (
        <PageContainer>
            <div className="clubimg-cover mb-3 mb-md-4">
                <img src={ClubImgPlaceholder} alt="" className="clubimg-bg" />
                <h1 className="clubtitle font-weight-bold mt-3 mt-md-4">
                    Amateur Sports Enthusiasts Club
                </h1>
            </div>
            <TabBar tabs={tabs} />
        </PageContainer>
    );
};

export default View;
