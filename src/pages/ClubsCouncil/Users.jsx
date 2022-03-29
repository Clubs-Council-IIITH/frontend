import { useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Done as ApprovedIcon, Autorenew as PendingIcon } from "@mui/icons-material";

import { useQuery } from "@apollo/client";
import { ADMIN_GET_ALL_USERS, ADMIN_GET_PENDING_MEMBERS } from "queries/members";
import UserModel from "models/UserModel";
import MemberModel from "models/MemberModel";

import Page from "components/Page";
import { renderCellExpand } from "components/GridCellExpand";

const pendingColumns = [
    {
        field: "firstName",
        headerName: "First Name",
        flex: 1.2,
        editable: false,
        valueGetter: (params) => params.row.user.firstName,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 1.2,
        editable: false,
        valueGetter: (params) => params.row.user.lastName,
    },
    {
        field: "batch",
        headerName: "Batch",
        editable: false,
        valueGetter: (params) => params.row.user.batch,
    },
    {
        field: "mail",
        headerName: "Email",
        flex: 2,
        editable: false,
        renderCell: renderCellExpand,
        valueGetter: (params) => params.row.user.mail,
    },
    {
        field: "club",
        headerName: "Club",
        flex: 1.2,
        editable: false,
        renderCell: renderCellExpand,
        valueGetter: (params) => params.row.club.name,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 0.8,
        editable: false,
        renderCell: renderCellExpand,
    },
    {
        field: "approve",
        headerName: "",
        editable: false,
        sortable: false,
        renderCell: () => (
            <Button variant="outlined" color="success">
                Approve
            </Button>
        ),
    },
];

const allUsersColumns = [
    {
        field: "img",
        headerName: "",
        flex: 0.2,
        editable: false,
        renderCell: (params) => <Avatar src={params.row.img} sx={{ width: 24, height: 24 }} />,
    },
    {
        field: "firstName",
        headerName: "First Name",
        flex: 1.2,
        editable: false,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 1.2,
        editable: false,
    },
    {
        field: "batch",
        headerName: "Batch",
        editable: false,
    },
    {
        field: "mail",
        headerName: "Email",
        flex: 2,
        editable: false,
        renderCell: renderCellExpand,
    },
];

const Users = () => {
    const [pendingMembers, setPendingMembers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // fetch pending requests
    const { loading: pendingMembersLoading } = useQuery(ADMIN_GET_PENDING_MEMBERS, {
        onCompleted: (data) =>
            setPendingMembers(data?.adminPendingMembers?.map((o) => new MemberModel(o))),
    });

    // fetch all users
    const { loading: allUsersLoading } = useQuery(ADMIN_GET_ALL_USERS, {
        onCompleted: (data) => setAllUsers(data?.adminAllUsers?.map((o) => new UserModel(o))),
    });

    return (
        <Page header={"Manage Users"} loading={null} empty={null}>
            <Box mb={3}>
                <Page full loading={pendingMembersLoading} empty={!pendingMembers?.length}>
                    <Typography color="#888888" mb={1}>
                        PENDING MEMBERSHIP REQUESTS
                    </Typography>
                    <DataGrid
                        rows={pendingMembers}
                        columns={pendingColumns}
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[]}
                        disableSelectionOnClick
                    />
                </Page>
            </Box>

            <Box>
                <Page full loading={allUsersLoading} empty={!allUsers?.length}>
                    <Typography color="#888888" mb={1}>
                        ALL USERS
                    </Typography>
                    <DataGrid
                        rows={allUsers}
                        columns={allUsersColumns}
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[]}
                        disableSelectionOnClick
                    />
                </Page>
            </Box>
        </Page>
    );
};

export default Users;
