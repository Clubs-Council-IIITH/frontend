import { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Page from "components/Page";
import ClubListItem from "components/ClubListItem";

import ClubService from "services/ClubService";

const Clubs = () => {
    const [clubs, setClubs] = useState({ loading: true });

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Page header={"Manage Clubs"} loading={clubs?.loading} empty={!clubs?.data?.length}>
            <Grid container spacing={2}>
                {clubs?.data?.map((club, idx) => (
                    <Grid item md={6} key={idx}>
                        <ClubListItem {...club} />
                    </Grid>
                ))}
            </Grid>
        </Page>
    );
};

export default Clubs;
