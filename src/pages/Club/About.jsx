import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import ClubModel from "models/ClubModel";

import UserGroups from "constants/UserGroups";

import { Box, Typography } from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";


import Page from "components/Page";
import RichTextEditor from "components/TextEditors/AboutText";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;
    useEffect(() => console.log(`targetId: ${targetId}`), [targetId]);


    // fetch club
    const { data, loading } = useQuery(GET_CLUB_BY_ID, { variables: { id: targetId } });
    const [club, setClub] = useState([]);
    useEffect(() => setClub(new ClubModel(data?.club)), [data]);
    

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton noPadding size="large" variant="outlined" color="primary"
                    onClick={() => {
                    }}
                >
                    <Box display="flex" mr={1}>
                        <EditIcon fontSize="small" />
                    </Box>
                    Edit Details
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);
    
    return (
        <>
            <Page full loading={loading}>
                <Box pt={2} px={3}>
                    <RichTextEditor>
                            {club?.description}
                    </RichTextEditor>
                </Box>
            </Page>
        </>
    );
};

export default About;
