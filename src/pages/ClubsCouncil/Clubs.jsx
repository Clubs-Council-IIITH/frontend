import { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { ADMIN_GET_ALL_CLUBS } from "queries/clubs";
import ClubModel from "models/ClubModel";

import { Box, Chip, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { green, red } from "@mui/material/colors";

import {
    AddOutlined as AddIcon,
    VisibilityOutlined as ViewIcon,
    EditOutlined as EditIcon,
    DeleteForeverOutlined as DeleteIcon,
} from "@mui/icons-material";

import Page from "components/Page";
import ClubFormModal from "components/modals/ClubFormModal";
import ClubDeleteModal from "components/modals/ClubDeleteModal";
import {
    PrimaryActionButton,
    SecondaryActionButton,
    EditButton,
    DeleteButton,
} from "components/buttons";

import { View as ViewClub } from "pages/Club";

const Clubs = () => {
    const history = useHistory();
    const match = useRouteMatch();

    const [clubs, setClubs] = useState([]);

    // fetch all clubs
    const { data, loading } = useQuery(ADMIN_GET_ALL_CLUBS, {
        onCompleted: (data) => setClubs(data?.adminClubs?.map((o) => new ClubModel(o))),
    });

    // create/edit club form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(false);

    // delete confirmation modal
    const [deleteProps, setDeleteProps] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        {
            field: "img",
            headerName: "",
            flex: 0.4,
            editable: false,
            renderCell: (params) => (
                <Avatar
                    src={params.row.img}
                    sx={{ width: "100%", height: "75%" }}
                    variant="rounded"
                />
            ),
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: false,
        },
        {
            field: "mail",
            headerName: "Email",
            flex: 1,
            editable: false,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 0.6,
            editable: false,
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            flex: 0.4,
            editable: false,
            renderCell: (params) => (
                <Chip
                    label={params.row.state}
                    sx={{
                        ...(params.row.state === "ACTIVE" && {
                            backgroundColor: green["200"],
                        }),

                        ...(params.row.state === "DELETED" && {
                            backgroundColor: red["200"],
                        }),
                    }}
                />
            ),
        },
        // {
        //     field: "view",
        //     headerName: "",
        //     editable: false,
        //     sortable: false,
        //     align: "center",
        //     flex: 0.2,
        //     renderCell: (params) => (
        //         <PrimaryActionButton
        //             noPadding
        //             onClick={() => {
        //                 history.push(`${match.url}/${params.row.id}`);
        //             }}
        //         >
        //             <ViewIcon />
        //         </PrimaryActionButton>
        //     ),
        // },
        {
            field: "edit",
            headerName: "",
            editable: false,
            sortable: false,
            align: "center",
            flex: 0.2,
            renderCell: (params) => (
                <EditButton
                    noPadding
                    onClick={() => {
                        setFormProps({ club: params.row });
                        setFormModal(true);
                    }}
                >
                    <EditIcon />
                </EditButton>
            ),
        },
        {
            field: "delete",
            headerName: "",
            editable: false,
            sortable: false,
            align: "center",
            flex: 0.2,
            renderCell: (params) => (
                <DeleteButton
                    noPadding
                    onClick={() => {
                        setDeleteProps({ club: params.row });
                        setDeleteModal(true);
                    }}
                >
                    <DeleteIcon />
                </DeleteButton>
            ),
        },
    ];

    return (
        <Switch>
            <Route exact path={match.path}>
                <>
                    <ClubFormModal controller={[formModal, setFormModal]} {...formProps} />
                    <ClubDeleteModal controller={[deleteModal, setDeleteModal]} {...deleteProps} />
                    <Page
                        header={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                Manage Clubs
                                <SecondaryActionButton
                                    noPadding
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    onClick={() => {
                                        setFormProps({});
                                        setFormModal(true);
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                    New Club
                                </SecondaryActionButton>
                            </Box>
                        }
                        loading={loading}
                        empty={!clubs?.length}
                    >
                        <DataGrid
                            rows={clubs}
                            columns={columns}
                            autoHeight
                            pageSize={10}
                            rowHeight={80}
                            rowsPerPageOptions={[]}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Page>
                </>
            </Route>
            <Route path={`${match.path}/:clubId`}>
                <ViewClub />
            </Route>
        </Switch>
    );
};

export default Clubs;
