import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";

import { clubs } from "api/endpoints";
import { HandleView } from "api/methods";

import TabBar from "components/Tabs";
import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";
import PageContainer from "components/PageContainer";
import ClubImgPlaceholder from "./assets/club-img-placeholder.jpg";

const View = ({ tabs }) => {
    const { id } = useParams();

    const [{ loading, data: club, error }, fetchClub] = HandleView(clubs.VIEW, { id: id });
    useEffect(() => fetchClub(), []); // eslint-disable-line

    return (
        <PageContainer>
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPage {...error} />
            ) : (
                <>
                    <div className="clubimg-cover mb-3 mb-md-4">
                        <img src={ClubImgPlaceholder} alt="" className="clubimg-bg" />
                        <h1 className="clubtitle font-weight-bold mt-3 mt-md-4">{club[0].name}</h1>
                    </div>
                    <TabBar tabs={tabs} />
                </>
            )}
        </PageContainer>
    );
};

export default View;
