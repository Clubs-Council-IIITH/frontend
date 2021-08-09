import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// import useSWR from "swr";
// import ClubService from "services/ClubService";
import { GetClubById } from "services/ClubService";

import { Box, Typography } from "@material-ui/core";
import { EditOutlined as EditIcon } from "@material-ui/icons";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.user?.club ? session.user.club : clubId;
    // const { data: club, isValidating } = useSWR(`clubs/${targetId}/about`, () =>
    //     ClubService.getClubById(targetId)
    // );
    const { data: club, loading } = GetClubById(targetId);

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
        <Page full loading={loading}>
            <Box py={4} px={3}>
                <Typography>{club?.description}</Typography>
            </Box>
        </Page>
    );
};

export default About;
