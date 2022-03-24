import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS } from "queries/members";
import MemberModel from "models/MemberModel";

import UserGroups from "constants/UserGroups";

import { Box, Grid, Typography } from "@mui/material";
import { Handshake as HandshakeIcon } from "@mui/icons-material";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import { MemberCard } from "components/cards";

const Members = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch members
    const GET_MEMBERS = manage ? ADMIN_GET_CLUB_MEMBERS : GET_CLUB_MEMBERS;
    const { data, loading } = useQuery(GET_MEMBERS, { variables: { id: targetId } });
    const [members, setMembers] = useState([]);
    useEffect(() => {
        const targetMembers = manage ? data?.adminClubMembers : data?.clubMembers;
        setMembers(targetMembers?.map((o) => new MemberModel(o)));
    }, [data]);

    // add member/create user form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(null);

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton
                    noPadding
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setFormProps({});
                        setFormModal(true);
                    }}
                >
                    <Box display="flex" mr={1}>
                        <HandshakeIcon fontSize="small" />
                    </Box>
                    Add Member
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);

    const cardProps = {
        manage,
    };

    return (
        <>
            <Page full loading={loading} empty={!members?.length}>
                <Box p={3}>
                    <Typography variant="h5" mb={2}>
                        2021-22
                    </Typography>
                    <Grid container spacing={4}>
                        {members?.map((member, idx) => (
                            <Grid item md={3} key={idx}>
                                <MemberCard {...member} {...cardProps} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Page>
        </>
    );
};

export default Members;
