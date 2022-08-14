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
import AboutMarkdown from "components/TextEditors/AboutMarkdown";

import SaveIcon from '@mui/icons-material/Save';

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;


    // fetch club
    const { dataCloses additional part of 40, loading } = useQuery(GET_CLUB_BY_ID, { variables: { id: targetId } });
    const [club, setClub] = useState([]);
    const [saved, setSaved] = useState(true);
    useEffect(() => setClub(new ClubModel(data?.club)), [data]);


    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (

                <SecondaryActionButton noPadding size="large" variant="outlined" color="primary"
                    onClick={() => {
                        setSaved(false);
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
                    {saved ? (<AboutMarkdown value={club?.description} />) : (<RichTextEditor>
                        {club?.description}
                    </RichTextEditor>)}

                </Box>
                {!saved ? (
                    <SecondaryActionButton noPadding size="large" variant="outlined" color="primary"
                        onClick={() => {
                            setSaved(true);
                        }}
                        style={{ position: "fixed", bottom: "20px", right: "20px" }}
                    >
                        <Box display="flex" mr={1}>
                            <SaveIcon fontSize="small" />
                        </Box>
                        Save Details
                    </SecondaryActionButton>) : null}
            </Page>
        </>
    );
};

export default About;
