import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";

import { clubs } from "api/endpoints";
import { handleView } from "api/methods";

import PageContainer from "components/PageContainer";
import TabBar from "components/Tabs";
import ClubImgPlaceholder from "./assets/club-img-placeholder.jpg";

const View = ({ tabs }) => {
    const { id } = useParams();
    const [club, setClub] = useState(null);

    useEffect(() => {
        const fetchClub = async () => {
            const res = await handleView(clubs.VIEW, { id: id });
            setClub(res.data[0]);
        };

        fetchClub();
    }, [setClub, id]);

    // TODO: rewrite API calls with reducers and LOADING/FAILED/SUCCESS states
    // TODO: introduce failed load page
    // TODO: implement routed tabs using nested routing on this page
    return (
        <PageContainer>
            {!club && "loading"}
            {club && (
                <>
                    <div className="clubimg-cover mb-3 mb-md-4">
                        <img src={ClubImgPlaceholder} alt="" className="clubimg-bg" />
                        <h1 className="clubtitle font-weight-bold mt-3 mt-md-4">{club.name}</h1>
                    </div>
                    <TabBar tabs={tabs} />
                </>
            )}
        </PageContainer>
    );
};

export default View;
