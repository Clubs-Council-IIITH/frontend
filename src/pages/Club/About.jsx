import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import ClubModel from "models/ClubModel";

import UserGroups from "constants/UserGroups";

import { Box } from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import RichTextEditor from "components/TextEditors/AboutText";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // set editor state
    const [editing, setEditing] = useState(false);

    // track input in state variable
    const [editorValue, setEditorValue] = useState(
        '[{"type":"paragraph","children":[{"text":"No description provided."}]}]'
    );

    // fetch club
    const { data, loading } = useQuery(GET_CLUB_BY_ID, { variables: { id: targetId } });
    const [club, setClub] = useState([]);
    useEffect(() => setClub(new ClubModel(data?.club)), [data]);

    // update club description
    const updateDescription = () => {
        console.log(editorValue);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        if (manage) {
            if (editing) {
                setActions(
                    <PrimaryActionButton
                        noPadding
                        size="large"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setEditing(false);
                            updateDescription();
                        }}
                    >
                        Save
                    </PrimaryActionButton>
                );
            } else {
                setActions(
                    <SecondaryActionButton
                        noPadding
                        size="large"
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditing(true)}
                    >
                        <Box display="flex" mr={1}>
                            <EditIcon fontSize="small" />
                        </Box>
                        Edit Details
                    </SecondaryActionButton>
                );
            }
        }
    }, [manage, editing, editorValue]);

    return (
        <>
            <Page full loading={loading}>
                <Box pt={2} px={3}>
                    <RichTextEditor editing={editing} editorState={[editorValue, setEditorValue]} />
                </Box>
            </Page>
        </>
    );
};

export default About;
