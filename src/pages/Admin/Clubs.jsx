import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    Typography,
} from "@material-ui/core";

import { blue, amber, red } from "@material-ui/core/colors";

import {
    AddOutlined as AddIcon,
    VisibilityOutlined as ViewIcon,
    EditOutlined as EditIcon,
    DeleteForeverOutlined as DeleteIcon,
} from "@material-ui/icons";

import Page from "components/Page";
import ClubFormModal from "components/modals/ClubFormModal";

import ClubService from "services/ClubService";

// styles {{{
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        fontSize: "1.4em",
    },
    viewButton: {
        borderColor: blue["A700"],
        color: blue["A700"],
    },
    editButton: {
        borderColor: amber["A700"],
        color: amber["A700"],
    },
    deleteButton: {
        borderColor: red["A700"],
        color: red["A700"],
    },
});
// }}}

const Clubs = () => {
    const classes = useStyles();
    const history = useHistory();

    const [clubs, setClubs] = useState({ loading: true });

    const [clubFormProps, setClubFormProps] = useState({});
    const [clubFormModal, setClubFormModal] = useState(null);

    // fetch list of clubs from API
    useEffect(() => {
        (async () => setClubs(await ClubService.getClubs()))();
    }, []);

    return (
        <Page
            header={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Manage Clubs
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => {
                            setClubFormProps({});
                            setClubFormModal(true);
                        }}
                    >
                        <AddIcon fontSize="small" />
                        New Club
                    </Button>
                </Box>
            }
            loading={clubs?.loading}
            empty={!clubs?.data?.length}
        >
            <ClubFormModal controller={[clubFormModal, setClubFormModal]} {...clubFormProps} />
            {/* <Button */}
            {/*     onClick={() => { */}
            {/*         setClubFormProps({ club: clubs?.data[0] }); */}
            {/*         setClubFormModal(true); */}
            {/*     }} */}
            {/* > */}
            {/*     edit asec */}
            {/* </Button> */}

            {/* TODO: convert this into a table */}
            {/* <Grid container spacing={1}> */}
            {/*     {clubs?.data?.map((club, idx) => ( */}
            {/*         <Grid item md={12} key={idx}> */}
            {/*             <ClubListItem {...club} /> */}
            {/*         </Grid> */}
            {/*     ))} */}
            {/* </Grid> */}
            <TableContainer component={(props) => <Card {...props} variant="outlined" />}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clubs?.data?.map((club) => (
                            <TableRow key={club.id}>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {club.name}
                                </TableCell>
                                <TableCell align="left" className={classes.cell}>
                                    <Typography color="textSecondary">{club.mail}</Typography>
                                </TableCell>
                                <TableCell align="right" className={classes.cell}>
                                    <Button
                                        variant="text"
                                        className={classes.viewButton}
                                        onClick={() => history.push(`/clubs/${club.id}`)}
                                    >
                                        <ViewIcon />
                                    </Button>
                                    <Button variant="text" className={classes.editButton}>
                                        <EditIcon />
                                    </Button>
                                    <Button variant="text" className={classes.deleteButton}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Page>
    );
};

export default Clubs;
