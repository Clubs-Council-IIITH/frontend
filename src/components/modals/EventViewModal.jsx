import { useTheme } from "@mui/styles";

import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Modal, ModalBody } from "components/modals";
import { LocationOn, Group } from "@mui/icons-material";

import { ISOtoDT } from "utils/DateTimeUtil";
import { AudienceFormatter } from "utils/EventUtil";

const EventViewModal = ({ event = null, controller: [open, setOpen] }) => {
    const theme = useTheme();

    return (
        <Modal controller={[open, setOpen]}>
            <ModalBody>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={event?.poster}
                                alt={event?.name}
                                sx={{
                                    borderRadius: theme.borderRadius,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Card variant="outlined" sx={{ border: "none" }}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography color="textPrimary" variant="h3">
                                            {event?.name}
                                        </Typography>

                                        <Box mt={1}>
                                            <Typography
                                                gutterBottom
                                                color="textSecondary"
                                                variant="subtitle1"
                                            >
                                                {`${ISOtoDT(event?.datetimeStart).datetime} — ${
                                                    ISOtoDT(event?.datetimeEnd).datetime
                                                }`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box my={4}>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontSize: "1.1em", whiteSpace: "pre-line" }}
                                        >
                                            {event?.description}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography my={2}>
                                            <Box display="flex" alignItems="center">
                                                <Group />
                                                <Box mx={2}>
                                                    {AudienceFormatter(event?.audience)}
                                                </Box>
                                            </Box>
                                        </Typography>

                                        <Typography my={2}>
                                            <Box display="flex" alignItems="center">
                                                <LocationOn />
                                                <Box mx={2}>{event?.venue}</Box>
                                            </Box>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </ModalBody>
        </Modal>
    );
};

export default EventViewModal;
