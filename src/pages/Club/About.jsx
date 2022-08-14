import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { Box, Typography } from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch club
    const { data: clubData, loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: targetId },
    });

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(null); // TODO: remove once rich text editor is done
        // setActions(
        //     manage ? (
        //         <SecondaryActionButton noPadding size="large" variant="outlined" color="primary">
        //             <Box display="flex" mr={1}>
        //                 <EditIcon fontSize="small" />
        //             </Box>
        //             Edit Details
        //         </SecondaryActionButton>
        //     ) : null
        // );
    }, [manage]);

    return (
        <Page full loading={clubLoading}>
            <Box px={3}>
                <Typography mt={4}>{clubData?.club?.description}</Typography>
            </Box>
        </Page>
    );
};

export default About;
