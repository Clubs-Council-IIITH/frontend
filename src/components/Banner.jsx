import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

const Banner = ({ content, Icon }) => {
    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ backgroundColor: "#111", borderRadius: theme.borderRadius }}>
            <CardContent>
                {Icon && (
                    <Box position="absolute" right="1em">
                        <Icon sx={{ color: "#fff", height: "9em", width: "9em" }} />
                    </Box>
                )}
                <Box display="flex" alignItems="center" padding="4em 2em" color="#eee">
                    <Typography variant="h4">
                        <Box fontWeight={500}>{content}</Box>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Banner;
