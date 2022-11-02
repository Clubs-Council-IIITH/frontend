import { useQuery } from "@apollo/client";
import { GET_COC_SCOREBOARD } from "queries/misc";

import {
    Paper,
    Typography,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from "@mui/material";
import { yellow, orange, grey } from "@mui/material/colors";
import { WorkspacePremium as MedalIcon } from "@mui/icons-material";

import Loading from "components/Loading";
import Empty from "components/Empty";

const COC = () => {
    const { data: scoreboardData, loading: scoreboardLoading } = useQuery(GET_COC_SCOREBOARD, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <Box p={2}>
            {scoreboardLoading ? (
                <Loading />
            ) : scoreboardData?.scoreboard.length === 0 ? (
                <Empty />
            ) : (
                <>
                    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" alignItems="center" mt={3}>
                            <MedalIcon sx={{ fontSize: 60, mr: 2, color: yellow[700] }} />
                            <Typography fontSize={60}>
                                {scoreboardData?.scoreboard[0].cluster}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={3}>
                            <MedalIcon sx={{ fontSize: 55, mr: 2, color: grey[500] }} />
                            <Typography fontSize={55}>
                                {scoreboardData?.scoreboard[1].cluster}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={3}>
                            <MedalIcon sx={{ fontSize: 50, mr: 2, color: orange[900] }} />
                            <Typography fontSize={50}>
                                {scoreboardData?.scoreboard[2].cluster}
                            </Typography>
                        </Box>
                    </Box>

                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 6 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell align="justify">Cluster</TableCell>
                                    <TableCell align="center">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scoreboardData?.scoreboard?.map((row, pos) => (
                                    <TableRow>
                                        <TableCell sx={{ p: 3 }}>{pos + 1}</TableCell>
                                        <TableCell align="justify">{row?.cluster}</TableCell>
                                        <TableCell align="center">{row?.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default COC;
