import Page from "components/Page";
import Data from "./interviews.json";

import {
    Divider,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRightStyle: "solid",
        borderRightColor: "grey",
        borderLeftStyle: "solid",
        borderLeftColor: "grey",
        width: "50%"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRightStyle: "solid",
        borderRightColor: "black",
        borderLeftStyle: "solid",
        borderLeftColor: "black",
        width: "50%"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // "&:last-child td, &:last-child th": {
    //     border: 0,
    // },
    "&:last-child td, &:last-child th": {
        borderBottomStyle: "solid",
        borderBottomColor: "black"
    },
}));

const InterviewPage = () => {
    return (
        <Page noToolbar header={"Interviews '23 Schedule"} loading={false} empty={false}>
            <Divider />
            <Typography variant="h6" pt={4} pb={3} px={2}>
                {/* <u>10-04-2023 (Monday)</u> - <b>Large Meeting Room 22 (KRB 2nd Floor)</b> */}
                <u>10-04-2023 (Monday)</u> - <b>TBA</b>
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Data.filter(({ date }) => date === 10)
                                .map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell component="th" scope="row">
                                            {data.name}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {data.starttime} - {data.endtime}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" pt={4} pb={3} px={2}>
                <u>11-04-2023 (Tuesday)</u> - <b>TBA</b>
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Data.filter(({ date }) => date === 11)
                                .map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell component="th" scope="row">
                                            {data.name}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {data.starttime} - {data.endtime}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" pt={4} pb={3} px={2}>
                <u>12-04-2023 (Wednesday)</u> - <b>TBA</b>
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Data.filter(({ date }) => date === 12)
                                .map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell component="th" scope="row">
                                            {data.name}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {data.starttime} - {data.endtime}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" pt={4} pb={3} px={2}>
                <u>13-04-2023 (Thursday)</u> - <b>TBA</b>
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Data.filter(({ date }) => date === 13)
                                .map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell component="th" scope="row">
                                            {data.name}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {data.starttime} - {data.endtime}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Page>
    );
};

export default InterviewPage;