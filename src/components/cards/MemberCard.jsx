import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";

const MemberCard = ({ user, role }) => {
    return (
        <Card variant="outlined">
            <Avatar variant="rounded" sx={{ width: "100%", height: "100%" }} />

            <CardContent>
                <Typography variant="h5" mb={1}>
                    {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="subtitle">{role}</Typography>

                <Box mt={5}>
                    <Typography>{user.batch}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MemberCard;
