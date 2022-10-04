import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { Box, Button } from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import RichTextEditor from "components/RichTextEditor";
import { InputLabel } from "@mui/material";

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
    const { loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: targetId },
        onCompleted: (data) => setEditorValue(data?.club?.description),
    });

    // update club description
    const updateDescription = () => {
        // TODO: mutation to update description
        console.log(editorValue);
    };

    // update club cover
    const updateCover = (src) => {
        // TODO: mutation to update cover
        console.log(src);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        if (manage) {
            if (editing) {
                setActions(
                    <Box>
                        <Button variant="outlined" component="label" size="large" sx={{ mr: 1 }}>
                            Update Cover
                            <input
                                hidden
                                name="cover"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(e) => {
                                    updateCover(URL.createObjectURL(e?.target?.files[0]));
                                }}
                            />
                        </Button>
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
                    </Box>
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
            <Page full loading={clubLoading}>
                <Box pt={2} px={2}>
                    <RichTextEditor editing={editing} editorState={[editorValue, setEditorValue]} />
                </Box>
            </Page>
        </>
    );
};

export default About;
