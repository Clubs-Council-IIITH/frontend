import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS } from "queries/members";
import MemberModel from "models/MemberModel";

import UserGroups from "constants/UserGroups";

import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Collapse,
} from "@mui/material";
import {
    ChevronRight as CollapsedIcon,
    ExpandMore as ExpandedIcon,
    Handshake as HandshakeIcon,
} from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import MemberFormModal from "components/modals/MemberFormModal";
import MemberDeleteModal from "components/modals/MemberDeleteModal";
import { MemberCard } from "components/cards";

export const YearMembers = ({ year, members, cardProps }) => {
    const [expandMembers, setExpandMembers] = useState(year === new Date().getFullYear() || year === new Date().getFullYear() - 1 || year === new Date().getFullYear() - 2);

    return (
        <>
            <ListItem disableGutters sx={{ maxWidth: "fit-content" }}>
                <ListItemButton
                    onClick={() => setExpandMembers(!expandMembers)}
                    sx={{ borderRadius: "8px" }}
                >
                    <ListItemText
                        primary={`${year} - ${(parseInt(year) + 1) % 1000}`}
                        sx={{ marginRight: 1 }}
                    />
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        {expandMembers ? <ExpandedIcon /> : <CollapsedIcon />}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>

            <Collapse in={expandMembers}>
                <Grid container spacing={2}>
                    {members?.map((member, idx) => (
                        <Grid item xs={6} md={3} key={idx}>
                            <MemberCard {...member} {...cardProps} />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </>
    );
};

const Members = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const [members, setMembers] = useState([]);
    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

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
            <MemberFormModal controller={[formModal, setFormModal]} {...formProps} />
            <MemberDeleteModal controller={[deleteModal, setDeleteModal]} {...deleteProps} />
            <Page full loading={loading} empty={!members?.length}>
                <Box px={2}>
                    <List>
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
            </Page>
        </>
    );
};

export default Members;
