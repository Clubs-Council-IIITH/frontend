import { useState, useEffect } from "react";

import { Button, Box, Grid } from "@material-ui/core";

import { Add } from "@material-ui/icons";

import Page from "components/Page";
import ClubListItem from "components/ClubListItem";
import ClubFormModal from "components/modals/ClubFormModal";

import ClubService from "services/ClubService";

const Clubs = () => {
    const [clubs, setClubs] = useState({ loading: true });

    const [clubFormModal, setClubFormModal] = useState(null);
    const [clubFormProps, setClubFormProps] = useState({});

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Page
            header={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Manage Clubs
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => {
                            setClubFormProps({});
                            setClubFormModal(true);
                        }}
                    >
                        <Add fontSize="small" />
                        New Club
                    </Button>
                </Box>
            }
            loading={clubs?.loading}
            empty={!clubs?.data?.length}
        >
            <ClubFormModal controller={[clubFormModal, setClubFormModal]} {...clubFormProps} />
            <Grid container spacing={1}>
                {clubs?.data?.map((club, idx) => (
                    <Grid item md={12} key={idx}>
                        <ClubListItem {...club} />
                    </Grid>
                ))}
            </Grid>
        </Page>
    );
};

export default Clubs;
