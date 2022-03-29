import { Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Done as ApprovedIcon, Autorenew as PendingIcon } from "@mui/icons-material";

import Page from "components/Page";
import { renderCellExpand } from "components/GridCellExpand";

const columns = [
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
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 1.2,
        editable: true,
    },
    // {
    //     field: "email",
    //     headerName: "Email",
    //     flex: 2,
    //     editable: true,
    //     renderCell: renderCellExpand,
    // },
    {
        field: "batch",
        headerName: "Batch",
        editable: true,
    },
    {
        field: "club",
        headerName: "Club",
        flex: 1.2,
        editable: false,
        renderCell: renderCellExpand,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 0.8,
        editable: false,
        renderCell: renderCellExpand,
    },
    {
        field: "approved",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 0.4,
        editable: false,
        renderCell: (params) =>
            params.row.approved ? (
                <ApprovedIcon color="success" />
            ) : (
                <PendingIcon color="warning" />
            ),
    },
    {
        field: "approve",
        headerName: "",
        editable: false,
        sortable: false,
        renderCell: (params) =>
            params.row.approved ? (
                <Button variant="outlined" color="error">
                    Reject
                </Button>
            ) : (
                <Button variant="outlined" color="success">
                    Approve
                </Button>
            ),
    },
];

const rows = [
    {
        id: 0,
        firstName: "Vishva Saravanan R",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 1,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "Pentaprism: The Photography Club",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 2,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 3,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 4,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 5,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 6,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 7,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 8,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 9,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
    {
        id: 10,
        firstName: "Firstname",
        lastName: "Lastname",
        batch: "UG2K19",
        club: "0x1337",
        role: "Coordinator",
        approved: false,
        email: "firstname.lastname@students.iiit.ac.in",
    },
];

const Users = () => {
    return (
        <Page header={"Manage Users"} loading={false} empty={false}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Page>
    );
};

export default Users;
