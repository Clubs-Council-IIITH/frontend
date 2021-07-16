import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EventService from "services/EventService";

import { Box, Grid } from "@material-ui/core";
import { AddOutlined as AddIcon } from "@material-ui/icons";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import EventFormModal from "components/modals/EventFormModal";
import { EventCard } from "components/cards";

const Events = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const [events, setEvents] = useState({ loading: true });

    // create/edit event form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(null);

    // fetch list of events from API
    useEffect(() => {
        (async () => {
            if (manage && session?.user?.club) {
                setEvents(await EventService.getEventsByClubId(session.user.club));
            } else {
                setEvents(await EventService.getEventsByClubId(clubId));
            }
        })();
    }, [clubId, manage, session?.user?.club]);

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton
                    noPadding
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setFormProps({});
                        setFormModal(true);
                    }}
                >
                    <Box display="flex" mr={1}>
                        <AddIcon fontSize="small" />
                    </Box>
                    New Event
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);

    return (
        <Page full loading={events?.loading} empty={!events?.data?.length}>
            <EventFormModal controller={[formModal, setFormModal]} {...formProps} />
            <Box p={3}>
                <Grid container spacing={2}>
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} key={idx}>
                            <EventCard manage={manage} {...event} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Page>
    );
};

export default Events;
