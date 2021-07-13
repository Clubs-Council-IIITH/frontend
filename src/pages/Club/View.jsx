import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Grid } from "@material-ui/core";

import Page from "components/Page";

import ClubService from "services/ClubService";

const View = () => {
    const { clubId } = useParams();

    const [club, setClub] = useState({ loading: true });

    // fetch club details from API
    useEffect(() => {
        (async () => setClub(await ClubService.getClub(clubId)))();
    }, [clubId]);

    return (
        <Page full header={""} loading={club?.loading} empty={null}>
            <img
                src={club?.data?.img}
                alt={club?.data?.name}
                style={{ width: "100%", height: "30vh" }}
            />
        </Page>
    );
};

export default View;
