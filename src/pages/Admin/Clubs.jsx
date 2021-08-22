import clsx from "clsx";

import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { ADMIN_GET_ALL_CLUBS } from "queries/clubs";
import ClubModel from "models/ClubModel";

import { makeStyles } from "@material-ui/core/styles";

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
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

import {
    AddOutlined as AddIcon,
    VisibilityOutlined as ViewIcon,
    EditOutlined as EditIcon,
    DeleteForeverOutlined as DeleteIcon,
} from "@material-ui/icons";

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

// styles {{{
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        fontSize: "1.4em",
    },
    activeChip: {
        backgroundColor: green["200"],
    },
    deletedChip: {
        backgroundColor: red["200"],
    },
});
// }}}

const Clubs = () => {
    const classes = useStyles();
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
                            component={(props) => <Card {...props} variant="outlined" />}
                        >
                            <Table stickyHeader className={classes.table}>
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
                                                className={classes.cell}
                                            >
                                                {club.name}
                                            </TableCell>
                                            <TableCell align="left" className={classes.cell}>
                                                <Typography color="textSecondary">
                                                    {club.mail}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" className={classes.cell}>
                                                <Chip
                                                    label={club.state}
                                                    className={clsx({
                                                        [classes.activeChip]:
                                                            club.state === "ACTIVE",
                                                        [classes.deletedChip]:
                                                            club.state === "DELETED",
                                                    })}
                                                />
                                            </TableCell>
                                            <TableCell align="right" className={classes.cell}>
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
