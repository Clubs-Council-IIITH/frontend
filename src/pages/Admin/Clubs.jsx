import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { ADMIN_GET_ALL_CLUBS } from "queries/clubs";
import ClubModel from "models/ClubModel";

import { useTheme } from "@mui/styles";

import {
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    Typography,
} from "@mui/material";
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
    const theme = useTheme();
    const history = useHistory();
    const match = useRouteMatch();

    // fetch all clubs
    const { data, loading } = useQuery(ADMIN_GET_ALL_CLUBS);
    const [clubs, setClubs] = useState([]);
    useEffect(() => setClubs(data?.adminClubs?.map((o) => new ClubModel(o))), [data]);

    // create/edit club form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(false);

    // delete confirmation modal
    const [deleteProps, setDeleteProps] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);

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
                        <TableContainer
                            component={(props) => (
                                <Card
                                    {...props}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: theme.borderRadius,
                                    }}
                                />
                            )}
                        >
                            <Table
                                stickyHeader
                                sx={{
                                    minWidth: 650,
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clubs?.map((club) => (
                                        <TableRow key={club.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    fontSize: "1.4em",
                                                }}
                                            >
                                                {club.name}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{
                                                    fontSize: "1.4em",
                                                }}
                                            >
                                                <Typography color="textSecondary">
                                                    {club.mail}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{
                                                    fontSize: "1.4em",
                                                }}
                                            >
                                                <Chip
                                                    label={club.state}
                                                    sx={{
                                                        ...(club.state === "ACTIVE" && {
                                                            backgroundColor: green["200"],
                                                        }),

                                                        ...(club.state === "DELETED" && {
                                                            backgroundColor: red["200"],
                                                        }),
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontSize: "1.4em",
                                                }}
                                            >
                                                <PrimaryActionButton
                                                    noPadding
                                                    onClick={() => {
                                                        history.push(`${match.url}/${club.id}`);
                                                    }}
                                                >
                                                    <ViewIcon />
                                                </PrimaryActionButton>
                                                <EditButton
                                                    noPadding
                                                    onClick={() => {
                                                        setFormProps({ club });
                                                        setFormModal(true);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </EditButton>
                                                <DeleteButton
                                                    noPadding
                                                    onClick={() => {
                                                        setDeleteProps({ club });
                                                        setDeleteModal(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </DeleteButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
