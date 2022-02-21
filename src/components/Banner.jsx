import { Box, Card, CardContent, Typography } from "@material-ui/core";

const Banner = ({ content, Icon }) => {
    return (
        <Card variant="outlined" style={{ backgroundColor: "#111", borderRadius: "8px" }}>
            <CardContent>
                {Icon && (
                    <Box position="absolute" right="1em">
                        <Icon style={{ color: "#fff", height: "9em", width: "9em" }} />
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
