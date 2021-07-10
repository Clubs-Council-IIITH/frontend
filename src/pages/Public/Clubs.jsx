import { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Page from "components/Page";
import ClubCard from "components/ClubCard";

import ClubService from "services/ClubService";

const Clubs = () => {
    const [clubs, setClubs] = useState({ loading: true });

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Page header={"Clubs"} loading={clubs?.loading} empty={!clubs?.data?.length}>
            <Grid container spacing={2}>
                {clubs?.data?.map((club, idx) => (
                    <Grid item md={4} lg={3} key={idx}>
                        <ClubCard {...club} />
                    </Grid>
                ))}
                {/* {clubs?.data?.map((club, idx) => ( */}
                {/*     <Grid item md={4} lg={3} key={idx}> */}
                {/*         <ClubCard {...club} /> */}
                {/*     </Grid> */}
                {/* ))} */}
                {/* {clubs?.data?.map((club, idx) => ( */}
                {/*     <Grid item md={4} lg={3} key={idx}> */}
                {/*         <ClubCard {...club} /> */}
                {/*     </Grid> */}
                {/* ))} */}
                {/* {clubs?.data?.map((club, idx) => ( */}
                {/*     <Grid item md={4} lg={3} key={idx}> */}
                {/*         <ClubCard {...club} /> */}
                {/*     </Grid> */}
                {/* ))} */}
                {/* {clubs?.data?.map((club, idx) => ( */}
                {/*     <Grid item md={4} lg={3} key={idx}> */}
                {/*         <ClubCard {...club} /> */}
                {/*     </Grid> */}
                {/* ))} */}
            </Grid>
        </Page>
    );
};

export default Clubs;
