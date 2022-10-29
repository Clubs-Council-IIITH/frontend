import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
    Grid,
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const table1 = {
    header: "Day 1 (9:00 - 12:30) - Sunday",
    rows: [
        "Clubs Council",
        "Literary Club",
        "Ping!",
        "Programming Club",
        "Cyclorama",
        "Skateboarding Club",
        "Electronics and Robotics Club",
        "Pentaprism",
        "TVRQC",
        "OSDG",
        "Language Club",
        "Gaming Club",
        "The Debate Society",
        "The Art Society",
        "Cultural Council",
        "NSS",
        "Campus Life Council",
        "Felicity",
    ],
};

const table2 = {
    header: "Day 2 (17:30 - 20:00) - Monday",
    rows: [
        "Parliament",
        "Music Club",
        "ASEC",
        "Decore",
        "Chess Club",
        "Hacking Club",
        "FHC",
        "Theory Club",
        "The Dance Crew",
        "Astronomy Club",
        "ISAQC",
        "CCC",
        "Fashion Club",
        "Alumni-cell",
        "E-Cell",
    ],
};

const IntrotoClubs = () => {
    return (
        <Box display="flex" justifyContent="center" width="100%" p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{table1.header}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table1.rows.map((row) => (
                                    <StyledTableRow key={row}>
                                        <StyledTableCell component="th" scope="row">
                                            {row}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{table2.header}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table2.rows.map((row) => (
                                    <StyledTableRow key={row}>
                                        <StyledTableCell component="th" scope="row">
                                            {row}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default IntrotoClubs;
