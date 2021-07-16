import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ClubService from "services/ClubService";

import { Box, Typography } from "@material-ui/core";
import { EditOutlined as EditIcon } from "@material-ui/icons";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const [club, setClub] = useState({ loading: true });

    // fetch club details from API
    useEffect(() => {
        (async () => {
            if (manage && session?.user?.club) {
                setClub(await ClubService.getClubById(session.user.club));
            } else {
                setClub(await ClubService.getClubById(clubId));
            }
        })();
    }, [clubId, manage, session?.user?.club]);

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton noPadding size="large" variant="outlined" color="primary">
                    <Box display="flex" mr={1}>
                        <EditIcon fontSize="small" />
                    </Box>
                    Edit Details
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);

    return (
        <Page full>
            <Box py={4} px={3}>
                <Typography>{club?.data?.description}</Typography>
            </Box>
        </Page>
    );
};

export default About;
