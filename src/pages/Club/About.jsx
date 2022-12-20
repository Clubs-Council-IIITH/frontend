import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import { UPDATE_CLUB } from "mutations/clubs";
import { GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS } from "queries/members";

import UserGroups from "constants/UserGroups";
import MemberModel from "models/MemberModel";

import { List, Box, Button, Typography } from "@mui/material";
import {
    EditOutlined as EditIcon,
    SaveOutlined as SaveIcon,
    UploadOutlined as UploadIcon,
} from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";

import Page from "components/Page";
import RichTextEditor from "components/RichTextEditor";

import { YearMembers } from "./Members"

const About = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // set editor state
    const [editing, setEditing] = useState(false);

    // track input in state variable
    const [editorValue, setEditorValue] = useState(null);

    // fetch club
    const { loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: targetId },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data?.club?.description) {
                setEditorValue(JSON.parse(data?.club?.description));
            } else {
                setEditorValue([{ type: "paragraph", children: [{ text: "" }] }]);
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

    const [members, setMembers] = useState([]);

    // fetch members
    const GET_MEMBERS = manage ? ADMIN_GET_CLUB_MEMBERS : GET_CLUB_MEMBERS;
    const { data, loading } = useQuery(GET_MEMBERS, {
        variables: { id: targetId },
        onCompleted: (data) => {
            const targetMembers = manage ? data?.adminClubMembers : data?.clubMembers;
            setMembers(targetMembers?.map((o) => new MemberModel(o)));
        },
    });

    // add member/create user form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(false);

    // delete confirmation modal
    const [deleteProps, setDeleteProps] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);

    // open edit modal and autofill data of member with given `id`
    const triggerEdit = (id) => {
        const targetMembers = (manage ? data?.adminClubMembers : data?.clubMembers).map(
            (o) => new MemberModel(o)
        );
        setFormProps({ member: targetMembers?.find((member) => member.id === id) });
        setFormModal(true);
    };

    // open delete modal
    const triggerDelete = (id) => {
        const targetMembers = (manage ? data?.adminClubMembers : data?.clubMembers).map(
            (o) => new MemberModel(o)
        );
        setDeleteProps({ member: targetMembers?.find((member) => member.id === id) });
        setDeleteModal(true);
    };

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        if (manage) {
            setActions([
                // {
                //     title: "Add Member (Coming Soon!)",
                //     icon: HandshakeIcon,
                //     disabled: true,
                //     // onClick: () => {
                //     //     setFormProps({});
                //     //     setFormModal(true);
                //     // },
                // },
            ]);
        }
    }, [manage]);

    const cardProps = {
        manage,
        triggerEdit,
        triggerDelete,
    };

    return (
        <>
            <Page full loading={clubLoading}>
                <Box pt={2} px={3}>
                    {editorValue ? (
                        <RichTextEditor
                            editing={editing}
                            editorState={[editorValue, setEditorValue]}
                        />
                    ) : null}
                </Box>
                {members.length ? (
                    <Box pt={2} px={3}>
                        <Typography variant="h6"> Members </Typography>

                        <List sx={{ pt: 2 }}>
                            {/* iterate over a sorted list of unique years and render that year's members */}
                            {members
                                ?.map((m) => m.year)
                                ?.filter((v, i, a) => a.indexOf(v) === i)
                                ?.sort((a, b) => parseInt(b) - parseInt(a))
                                ?.map((year) => (
                                    <YearMembers
                                        year={year}
                                        members={members?.filter((m) => m.year === year)}
                                        cardProps={cardProps}
                                    />
                                ))}
                        </List>
                    </Box>
                ) : null}
            </Page>
        </>
    );
};

export default About;
