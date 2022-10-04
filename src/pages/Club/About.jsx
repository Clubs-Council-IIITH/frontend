import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import { UPDATE_CLUB } from "mutations/clubs";

import UserGroups from "constants/UserGroups";

import { Box, Button } from "@mui/material";
import {
    EditOutlined as EditIcon,
    SaveOutlined as SaveIcon,
    UploadOutlined as UploadIcon,
} from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";

import Page from "components/Page";
import RichTextEditor from "components/RichTextEditor";

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // set editor state
    const [editing, setEditing] = useState(false);

    // track input in state variable
    const [editorValue, setEditorValue] = useState([
        { type: "paragraph", children: [{ text: "" }] },
    ]);

    // fetch club
    const { loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: targetId },
        onCompleted: (data) => {
            if (data?.club?.description) {
                setEditorValue(JSON.parse(data?.club?.description));
            }
        },
    });

    const [updateClub, { error: updateError }] = useMutation(UPDATE_CLUB, {
        refetchQueries: [{ query: GET_CLUB_BY_ID, variables: { id: targetId } }],
        awaitRefetchQueries: true,
    });

    // update club description
    const updateDescription = async () => {
        await updateClub({ variables: { description: JSON.stringify(editorValue), id: targetId } });
        console.log(editorValue);
        console.log(updateError);
    };

    // update club cover
    const updateCover = async (src) => {
        await updateClub({ variables: { img: src, id: targetId, mail: session?.username } });
        console.log(src);
        console.log(updateError);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        if (manage) {
            if (editing) {
                setActions([
                    {
                        title: (
                            <>
                                Update Cover
                                <input
                                    name="cover"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        updateCover(e?.target?.files[0]);
                                    }}
                                    hidden
                                />
                            </>
                        ),
                        icon: UploadIcon,
                        component: "label",
                    },
                    {
                        title: "Save",
                        icon: SaveIcon,
                        color: "info",
                        onClick: () => {
                            setEditing(false);
                            updateDescription();
                        },
                    },
                ]);
            } else {
                setActions([
                    {
                        title: "Edit Details",
                        icon: EditIcon,
                        onClick: () => setEditing(true),
                    },
                ]);
            }
        }
    }, [manage, editing, editorValue]);

    return (
        <>
            <Page full loading={clubLoading}>
                <Box pt={2} px={3}>
                    <RichTextEditor editing={editing} editorState={[editorValue, setEditorValue]} />
                </Box>
            </Page>
        </>
    );
};

export default About;
