import { Box, Typography, Card, CardContent, Avatar, Tooltip } from "@mui/material";
import { Done as ApprovedIcon, Autorenew as PendingIcon } from "@mui/icons-material";

const MemberCard = ({ manage, user, role, approved }) => {
    return (
        <Card variant="none">
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ width: "180px", height: "180px" }} />

                <Typography variant="h5" mb={1} mt={2} sx={{ textAlign: "center" }}>
                    {`${user.firstName} ${user.lastName}`}
                </Typography>

                <Box display="flex" alignItems="center">
                    <Typography variant="subtitle" mx={1}>
                        {role}
                    </Typography>

                    {/* show approval status in manage mode */}
                    {manage &&
                        (approved ? (
                            <Tooltip title="Approved">
                                <ApprovedIcon fontSize="small" color="success" />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Pending Approval">
                                <PendingIcon fontSize="small" color="warning" />
                            </Tooltip>
                        ))}
                </Box>

                <Box mt={3}>
                    <Typography sx={{ color: "#888888" }}>{user.batch}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MemberCard;
